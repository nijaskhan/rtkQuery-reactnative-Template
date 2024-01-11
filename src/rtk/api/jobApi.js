import {api} from '../rtkApi';

export const jobApi = api.injectEndpoints({
  endpoints: builder => ({
    listJobs: builder.query({
      query: ({baseUrl, modelid, pageno}) => {
        return {
          url: `${baseUrl}/api/Jobs/${modelid}/${pageno}/`,
          method: 'Get',
        };
      },
      transformResponse: response => {
        let data = [];
        if (response.data.length > 0) {
          data = response.data.map(item => {
            return {
              ...item,
              title: item.month,
              data: item.jobs,
            };
          });
        } else {
          data = [];
        }
        return data;
      },
      providesTags: ['jobs'],
    }),
    updateJobStatus: builder.mutation({
      query: ({baseUrl, jobId, status, userId}) => ({
        url: `${baseUrl}/api/Dashboard/UpdateJobStatus/`,
        body: {jobId: jobId, status: status, userId: userId},
        method: 'POST',
      }),
      invalidatesTags: ['jobs'],
    }),
  }),
  //   overrideExisting: true,
});

export const {useListJobsQuery, useUpdateJobStatusMutation} = jobApi;
