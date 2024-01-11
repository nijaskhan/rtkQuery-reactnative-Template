import {api} from '../rtkApi';

export const homeApi = api.injectEndpoints({
  endpoints: builder => ({
    listHome: builder.query({
      query: ({baseUrl, userId}) => {
        return {
          url: `${baseUrl}/api/Dashboard/${userId}/`,
          method: 'Get',
        };
      },
      providesTags: ['jobs'],
    }),
  }),
  overrideExisting: true,
});

export const {useListHomeQuery} = homeApi;
