import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  DYNAMIC_URL_KEY,
  ERROR_MESSAGE,
  getEncodeData,
  getJSONHeaderType,
  SERVER_URL,
} from 'utils/apiutils';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export const getBookings = createAsyncThunk(
  'booking/list',
  async ({modelid, pageno}, thunkAPI) => {
    try {
      let url = await AsyncStorage.getItem(DYNAMIC_URL_KEY);
      let response = await axios.get(
        `${url}/api/Events/${modelid}/${pageno}/`,
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

export const getBookingAttachments = createAsyncThunk(
  'booking/attachments/get',
  async ({mbf_mb_id, mod_id}, thunkAPI) => {
    try {
      let url = await AsyncStorage.getItem(DYNAMIC_URL_KEY);
      let response = await axios.get(
        `${url}/api/ModelBooking/Booking/ModelBookingFilesList/${mbf_mb_id}/${mod_id}/`,
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

export const postBookingAttachments = createAsyncThunk(
  'booking/attachments/post',
  async ({mbf_file, mod_id, mbf_mb_id}, thunkAPI) => {
    try {
      let url = await AsyncStorage.getItem(DYNAMIC_URL_KEY);
      let data = {mbf_file: mbf_file, mod_id: mod_id, mbf_mb_id: mbf_mb_id};

      let response = await axios.post(
        `${url}/api/ModelBooking/Booking/ModelBookingFilesIns/`,
        data,
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
      console.log(e);
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const blockBooking = createAsyncThunk(
  'booking/block',
  async (
    {
      mb_mod_id,
      mb_title,
      mb_desc,
      mb_start_date,
      mb_start_time,
      mb_end_date,
      mb_end_time,
    },
    thunkAPI,
  ) => {
    try {
      let url = await AsyncStorage.getItem(DYNAMIC_URL_KEY);
      let data = {
        mb_mod_id: mb_mod_id,
        mb_title: mb_title,
        mb_desc: mb_desc,
        mb_start_date: mb_start_date,
        mb_start_time: mb_start_time,
        mb_end_date: mb_end_date,
        mb_end_time: mb_end_time,
      };
      let response = await axios.post(
        `${url}/api/ModelBooking/Booking/ModelBookingInsByModel/`,
        data,
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

export const deleteBooking = createAsyncThunk(
  'booking/delete',
  async ({modelid, pageno}, thunkAPI) => {
    try {
      let url = await AsyncStorage.getItem(DYNAMIC_URL_KEY);
      let response = await axios.post(
        `${url}/api/ModelBooking/Booking/ModelBookingBlockedDelByModel/`,
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

export const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    bookingListing: {},
    isBookingFetching: false,
    isBookingSuccess: false,
    isBookingError: false,
    bookingErrorMessage: '',
    bookingFiles: [],
    isBookingFilesFetching: false,
    isBookingFilesSuccess: false,
    isBookingFilesError: false,
    bookingFileErrorMessage: '',
    isPostBookingFilesFetching: false,
    isPostBookingFilesSuccess: false,
    isPostBookingFilesError: false,
    postBookingFileErrorMessage: '',
    isBlockBookingFetching: false,
    isBlockBookingSuccess: false,
    isBlockBookingError: false,
    blockBookingErrorMessage: '',
    isDeleteBookingFetching: false,
    isDeleteBookingSuccess: false,
    isDeleteBookingError: false,
    deleteBookingErrorMessage: '',
  },
  reducers: {
    clearBookingState: state => {
      state.isBookingFetching = false;
      state.isBookingSuccess = false;
      state.isBookingError = false;
      state.isBookingFilesFetching = false;
      state.isBookingFilesError = false;
      state.isBookingFilesSuccess = false;
      state.isPostBookingFilesFetching = false;
      state.isPostBookingFilesError = false;
      state.isPostBookingFilesSuccess = false;
      state.isBlockBookingFetching = false;
      state.isBlockBookingSuccess = false;
      state.isBlockBookingError = false;
      state.isDeleteBookingFetching = false;
      state.isDeleteBookingSuccess = false;
      state.isDeleteBookingError = false;
      return state;
    },
  },
  extraReducers: builder => {
    builder.addCase(getBookings.fulfilled, (state, {payload}) => {
      let formattedArray = {};
      if (payload.data.length > 0) {
        payload.data.map(item => {
          item.events.map(event => {
            formattedArray[
              moment(event.eventStartDate, 'DD MMM YYYY').format('YYYY-MM-DD')
            ] = {marked: true, data: [event]};
          });
        });
      } else {
        state.bookingListing = {};
      }
      state.bookingListing = formattedArray;
      state.isBookingFetching = false;
      state.isBookingSuccess = true;

      return state;
    }),
      builder.addCase(getBookings.rejected, (state, {payload}) => {
        if (payload.status) {
          state.bookingErrorMessage = payload.status.message_details;
        } else {
          state.bookingErrorMessage = ERROR_MESSAGE;
        }
        state.isBookingError = true;
        state.isBookingFetching = false;

        return state;
      }),
      builder.addCase(getBookings.pending, (state, {payload}) => {
        state.isBookingFetching = true;
      }),
      builder.addCase(getBookingAttachments.fulfilled, (state, {payload}) => {
        console.log(payload);
        if (payload.data.length > 0) {
          state.bookingFiles = payload.data;
        } else {
          state.bookingFiles = [];
        }
        state.isBookingFilesFetching = false;
        state.isBookingFilesSuccess = true;

        return state;
      }),
      builder.addCase(getBookingAttachments.rejected, (state, {payload}) => {
        if (payload.status) {
          state.bookingFileErrorMessage = payload.status.message_details;
        } else {
          state.bookingFileErrorMessage = ERROR_MESSAGE;
        }
        state.isBookingFilesError = true;
        state.isBookingFilesFetching = false;

        return state;
      }),
      builder.addCase(getBookingAttachments.pending, (state, {payload}) => {
        state.isBookingFilesFetching = true;
      }),
      builder.addCase(postBookingAttachments.fulfilled, (state, {payload}) => {
        state.isPostBookingFilesFetching = false;
        state.isPostBookingFilesSuccess = true;

        return state;
      }),
      builder.addCase(postBookingAttachments.rejected, (state, {payload}) => {
        if (payload.status) {
          state.postBookingFileErrorMessage = payload.status.message_details;
        } else {
          state.postBookingFileErrorMessage = ERROR_MESSAGE;
        }
        state.isPostBookingFilesError = true;
        state.isPostBookingFilesFetching = false;

        return state;
      }),
      builder.addCase(postBookingAttachments.pending, (state, {payload}) => {
        state.isPostBookingFilesFetching = true;
      }),
      builder.addCase(blockBooking.fulfilled, (state, {payload}) => {
        state.isBlockBookingFetching = false;
        state.isBlockBookingSuccess = true;

        return state;
      }),
      builder.addCase(blockBooking.rejected, (state, {payload}) => {
        console.log(payload);
        if (payload.status) {
          state.blockBookingErrorMessage = payload.status.message_details;
        } else {
          state.blockBookingErrorMessage = ERROR_MESSAGE;
        }
        state.isBlockBookingError = true;
        state.isBlockBookingFetching = false;

        return state;
      }),
      builder.addCase(blockBooking.pending, (state, {payload}) => {
        state.isBlockBookingFetching = true;
      }),
      builder.addCase(deleteBooking.fulfilled, (state, {payload}) => {
        state.isDeleteBookingFetching = false;
        state.isDeleteBookingSuccess = true;

        return state;
      }),
      builder.addCase(deleteBooking.rejected, (state, {payload}) => {
        if (payload.status) {
          state.deleteBookingErrorMessage = payload.status.message_details;
        } else {
          state.deleteBookingErrorMessage = ERROR_MESSAGE;
        }
        state.isDeleteBookingError = true;
        state.isDeleteBookingFetching = false;

        return state;
      }),
      builder.addCase(deleteBooking.pending, (state, {payload}) => {
        state.isDeleteBookingFetching = true;
      });
  },
});

export const {clearBookingState} = bookingSlice.actions;
export const bookingSelector = state => state.booking;
