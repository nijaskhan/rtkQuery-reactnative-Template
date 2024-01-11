import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getJSONHeaderType} from '../utils/apiutils';

export const api = createApi({
  reducerPath: 'api',
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  tagTypes: ['jobs', 'bookings'],
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    headers: getJSONHeaderType(),
  }),
  endpoints: () => ({}),
  //   endpoints: builder => ({
  //     listJobs: builder.query({
  //       query: ({baseUrl, modelid, pageno}) => {
  //         return {
  //           url: `${baseUrl}/api/Jobs/${modelid}/${pageno}/`,
  //           method: 'Get',
  //         };
  //       },
  //       transformResponse: response => {
  //         let data = [];
  //         console.log('response', response);
  //         if (response.data.length > 0) {
  //           data = response.data.map(item => {
  //             return {
  //               ...item,
  //               title: item.month,
  //               data: item.jobs,
  //             };
  //           });
  //         } else {
  //           data = [];
  //         }
  //         return data;
  //       },
  //       providesTags: ['jobs'],
  //     }),
  //     updateJobStatus: builder.mutation({
  //       query: ({baseUrl, jobId, status, userId}) => ({
  //         invalidatesTags: ['jobs'],
  //         url: `${baseUrl}/api/Dashboard/UpdateJobStatus/`,
  //         body: {jobId: jobId, status: status, userId: userId},
  //         method: 'POST',
  //       }),
  //     }),
  //   }),
});

// export const {useListJobsQuery, useUpdateJobStatusMutation} = api;
