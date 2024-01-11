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
import moment from 'moment';

export const getHomeData = createAsyncThunk(
  'home/list',
  async ({userId}, thunkAPI) => {
    try {
      let url = await AsyncStorage.getItem(DYNAMIC_URL_KEY);
      let response = await axios.get(`${url}/api/Dashboard/${userId}/`, {
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

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    homeListing: {},
    isHomeFetching: false,
    isHomeSuccess: false,
    isHomeError: false,
    homeErrorMessage: '',
  },
  reducers: {
    clearHomeState: state => {
      state.isHomeFetching = false;
      state.isHomeSuccess = false;
      state.isHomeError = false;
      return state;
    },
  },
  extraReducers: builder => {
    builder.addCase(getHomeData.fulfilled, (state, {payload}) => {
      state.homeListing = payload.data;

      state.isHomeFetching = false;
      state.isHomeSuccess = true;

      return state;
    }),
      builder.addCase(getHomeData.rejected, (state, {payload}) => {
        if (payload.status) {
          state.homeErrorMessage = payload.status.message_details;
        } else {
          state.homeErrorMessage = ERROR_MESSAGE;
        }
        state.isHomeError = true;
        state.isHomeFetching = false;

        return state;
      }),
      builder.addCase(getHomeData.pending, (state, {payload}) => {
        state.isHomeFetching = true;
      });
  },
});

export const {clearHomeState} = homeSlice.actions;
export const homeSelector = state => state.home;
