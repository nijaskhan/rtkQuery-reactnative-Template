import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  DYNAMIC_URL_KEY,
  ERROR_MESSAGE,
  getEncodeData,
  getJSONHeaderType,
  SERVER_URL,
} from 'utils/apiutils';

const axiosInstance = require('utils/apiutils/AxiosConfig');
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getProfile = createAsyncThunk(
  'profile/list',
  async ({userid}, thunkAPI) => {
    try {
      let url = await AsyncStorage.getItem(DYNAMIC_URL_KEY);
      let response = await axios.get(`${url}/api/Profile/Details/${userid}/`, {
        headers: getJSONHeaderType(),
      });
      if (response.status === 200) {
        if (response.data.status === 1) {
          return response.data;
        } else {
          return thunkAPI.rejectWithValue(response.data);
        }
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const editProfile = createAsyncThunk(
  'profile/update',
  async (
    {agId, userId, userPhone, userName, userAddress, userEmail},
    thunkAPI,
  ) => {
    try {
      let data = {
        agId: agId,
        userId: userId,
        userPhone: userPhone,
        userName: userName,
        userAddress: userAddress,
        userEmail: userEmail,
      };
      let url = await AsyncStorage.getItem(DYNAMIC_URL_KEY);
      let response = await axios.post(`${url}/api/Profile/Update/`, data, {
        headers: getJSONHeaderType(),
      });
      if (response.status === 200) {
        if (response.data.status === 1) {
          return response.data;
        } else {
          return thunkAPI.rejectWithValue(response.data);
        }
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    userData: null,
    isProfileFetching: false,
    isProfileSuccess: false,
    isProfileError: false,
    profileErrorMessage: '',
    isEditProfileFetching: false,
    isEditProfileSuccess: false,
    isEditProfileError: false,
    editProfileErrorMessage: '',
  },
  reducers: {
    clearProfileState: state => {
      state.isProfileFetching = false;
      state.isProfileSuccess = false;
      state.isProfileError = false;
      state.isEditProfileFetching = false;
      state.isEditProfileSuccess = false;
      state.isEditProfileError = false;
      return state;
    },
  },
  extraReducers: builder => {
    builder.addCase(getProfile.fulfilled, (state, {payload}) => {
      state.userData = payload.data;

      state.isProfileFetching = false;
      state.isProfileSuccess = true;

      return state;
    }),
      builder.addCase(getProfile.rejected, (state, {payload}) => {
        console.log('Profile error', payload);
        if (payload.status) {
          state.profileErrorMessage = payload.status.message_details;
        } else {
          state.profileErrorMessage = ERROR_MESSAGE;
        }
        state.isProfileError = true;
        state.isProfileFetching = false;

        return state;
      }),
      builder.addCase(getProfile.pending, (state, {payload}) => {
        state.isProfileFetching = true;
      }),
      builder.addCase(editProfile.fulfilled, (state, {payload}) => {
        state.isEditProfileFetching = false;
        state.isEditProfileSuccess = true;

        return state;
      }),
      builder.addCase(editProfile.rejected, (state, {payload}) => {
        console.log('Profile error', payload);
        if (payload.status) {
          state.editProfileErrorMessage = payload.status.message_details;
        } else {
          state.editProfileErrorMessage = ERROR_MESSAGE;
        }
        state.isEditProfileError = true;
        state.isEditProfileFetching = false;

        return state;
      }),
      builder.addCase(editProfile.pending, (state, {payload}) => {
        state.isEditProfileFetching = true;
      });
  },
});

export const {clearProfileState} = profileSlice.actions;
export const profileSelector = state => state.profile;
