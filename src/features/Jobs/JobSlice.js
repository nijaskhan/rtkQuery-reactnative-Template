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

export const getJobList = createAsyncThunk(
  'jobs/list',
  async ({modelid, pageno}, thunkAPI) => {
    try {
      let url = await AsyncStorage.getItem(DYNAMIC_URL_KEY);
      let response = await axios.get(`${url}/api/Jobs/${modelid}/${pageno}/`, {
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

export const updateJobStatus = createAsyncThunk(
  'jobs/updateStatus',
  async ({jobId, status, userId}, thunkAPI) => {
    try {
      var data = {
        jobId: jobId,
        status: status,
        userId: userId,
      };

      let url = await AsyncStorage.getItem(DYNAMIC_URL_KEY);
      let response = await axios.post(
        `${url}/api/Dashboard/UpdateJobStatus/`,
        data,
        {
          headers: getJSONHeaderType(),
        },
      );
      console.log(JSON.stringify(response));
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

export const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobListing: [],
    isJobFetching: false,
    isJobSuccess: false,
    isJobError: false,
    jobErrorMessage: '',
    isJobStatusUpdated: false,
    isJobStatusUpdating: false,
    isJobStatusUpdateError: false,
    isJobStatusUpdateErrorMsg: '',
  },
  reducers: {
    clearJobState: state => {
      state.isJobFetching = false;
      state.isJobSuccess = false;
      state.isJobError = false;
      state.isJobStatusUpdated = false;
      state.isJobStatusUpdating = false;
      state.isJobStatusUpdateError = false;
      return state;
    },
    clearJobData: state => {
      state.jobListing = [];
      return state;
    },
  },
  extraReducers: builder => {
    builder.addCase(getJobList.fulfilled, (state, {payload}) => {
      if (payload.data.length > 0) {
        state.jobListing = payload.data.map(item => {
          return {
            ...item,
            title: item.month,
            data: item.jobs,
          };
        });
      } else {
        state.jobListing = [];
      }
      state.isJobFetching = false;
      state.isJobSuccess = true;

      return state;
    }),
      builder.addCase(getJobList.rejected, (state, {payload}) => {
        if (payload.status) {
          state.jobErrorMessage = payload.status.message_details;
        } else {
          state.jobErrorMessage = ERROR_MESSAGE;
        }
        state.isJobError = true;
        state.isJobFetching = false;

        return state;
      }),
      builder.addCase(getJobList.pending, (state, {payload}) => {
        state.isJobFetching = true;
      }),
      builder.addCase(updateJobStatus.fulfilled, (state, {payload}) => {
        if (payload?.status === 1) {
          state.isJobStatusUpdated = true;
        } else {
          state.isJobStatusUpdated = false;
        }
        state.isJobStatusUpdating = false;
        state.isJobStatusUpdated = true;

        return state;
      }),
      builder.addCase(updateJobStatus.rejected, (state, {payload}) => {
        if (payload.status) {
          state.isJobStatusUpdateErrorMsg = payload.status.message_details;
        } else {
          state.isJobStatusUpdateErrorMsg = ERROR_MESSAGE;
        }
        state.isJobStatusUpdateError = true;
        state.isJobStatusUpdating = false;

        return state;
      }),
      builder.addCase(updateJobStatus.pending, (state, {payload}) => {
        state.isJobStatusUpdating = true;
      });
  },
});

export const {clearJobState, clearJobData} = jobSlice.actions;
export const jobSelector = state => state.jobs;
