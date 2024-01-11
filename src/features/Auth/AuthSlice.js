import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  DYNAMIC_URL_KEY,
  ERROR_MESSAGE,
  getJSONHeaderType,
  SERVER_URL,
} from 'utils/apiutils';

import axios from 'axios';
// !!!change this according to the technology you are using.
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({email, password, deviceId}, thunkAPI) => {
    try {
      var data = {
        email: email,
        password: password,
        deviceId: deviceId,
      };

      let response = await axios.post(SERVER_URL + 'api/ModelLogin/', data, {
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

export const loadPantSize = createAsyncThunk(
  'auth/pantSize',
  async thunkAPI => {
    try {
      let url = await AsyncStorage.getItem(DYNAMIC_URL_KEY);
      let response = await axios.get(
        url + '/api/DropDownList/Masters/PantsSize/',
        {
          headers: getJSONHeaderType(),
        },
      );
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

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: '',
    userName: '',
    userProfileImage: '',
    userAgencyId: '',
    userAgencyName: '',
    userAgencyDomain: '',
    userEmail: '',
    isLoginFetching: false,
    isLoginSuccess: false,
    isLoginError: false,
    errorMessage: '',
    isIntroShown: false,
    isDrawerOpen: false,
    isJobClick: false,
    isBookingClick: false,
    colorScheme: 'light',
  },
  reducers: {
    clearState: state => {
      state.isLoginError = false;
      state.isLoginFetching = false;
      state.isLoginSuccess = false;
      state.isDrawerOpen = false;
      state.isJobClick = false;
      state.isBookingClick = false;
      return state;
    },
    logout: state => {
      if (auth().currentUser !== null) {
        auth().signOut();
      }
      AsyncStorage.removeItem('persist:root');
      state.userId = '';
      state.userName = '';
      state.userProfileImage = '';
      state.userAgencyId = '';
      state.userAgencyName = '';
      state.userAgencyDomain = '';
      state.userEmail = '';
      state.isLoginFetching = false;
      state.isLoginSuccess = false;
      state.isLoginError = false;
      state.errorMessage = '';
      state.isUserExist = false;
      state.isDrawerOpen = false;
      return state;
    },
    setIntroShown: state => {
      state.isIntroShown = true;
      return state;
    },
    setUser: state => {
      state.isUserExist = true;
      return state;
    },
    setDrawerOpen: (state, data) => {
      console.log('payload', data.payload.status);
      state.isDrawerOpen = data.payload.status;
      return state;
    },
    clearUser: state => {
      state.isUserExist = false;
      return state;
    },
    setJobClick: state => {
      state.isJobClick = true;
      return state;
    },
    clearJobClick: state => {
      state.isJobClick = false;
      return state;
    },
    setBookingClick: state => {
      state.isBookingClick = true;
      return state;
    },
    clearBookingClick: state => {
      state.isBookingClick = false;
      return state;
    },
    setTheme: state => {
      state.colorScheme = state.colorScheme == 'dark' ? 'light' : 'dark';
      return state;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginUser.fulfilled, (state, {payload}) => {
      state.userId = payload.data.userId;
      state.userName = payload.data.userName;
      state.userProfileImage = payload.data.userProfileImage;
      state.userAgencyId = payload.data.userAgencyId;
      state.userAgencyName = payload.data.userAgencyName;
      state.userAgencyDomain = payload.data.userAgencyDomain;
      state.userEmail = payload.data.userEmail;
      state.isLoginFetching = false;
      state.isLoginSuccess = true;
      AsyncStorage.setItem(DYNAMIC_URL_KEY, payload.data.userAgencyDomain);

      return state;
    }),
      builder.addCase(loginUser.rejected, (state, {payload}) => {
        if (payload.status) {
          state.errorMessage = payload.status.message_details;
        } else {
          state.errorMessage = ERROR_MESSAGE;
        }
        state.isLoginError = true;
        state.isLoginFetching = false;

        return state;
      }),
      builder.addCase(loginUser.pending, (state, {payload}) => {
        state.isLoginFetching = true;
      }),
      builder.addCase(loadPantSize.fulfilled, (state, {payload}) => {
        console.log('sizess', payload);
        return state;
      }),
      builder.addCase(loadPantSize.rejected, (state, {payload}) => {
        console.log('size error', payload);
        return state;
      }),
      builder.addCase(loadPantSize.pending, (state, {payload}) => {
        console.log('fetching');
      });
  },
});

export const {
  clearState,
  logout,
  setIntroShown,
  setUser,
  setDrawerOpen,
  clearUser,
  setJobClick,
  clearJobClick,
  setBookingClick,
  clearBookingClick,
  setTheme,
} = authSlice.actions;
export const userSelector = state => state.auth;
