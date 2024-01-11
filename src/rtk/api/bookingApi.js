import moment from 'moment';
import {api} from '../rtkApi';

export const bookingApi = api.injectEndpoints({
  endpoints: builder => ({
    listBookings: builder.query({
      query: ({baseUrl, modelid, pageno}) => {
        return {
          url: `${baseUrl}/api/Events/${modelid}/${pageno}/`,
          method: 'Get',
        };
      },
      transformResponse: response => {
        let data = {};
        if (response.data.length > 0) {
          response.data.map(item => {
            item.events.map(event => {
              data[
                moment(event.eventStartDate, 'DD MMM YYYY').format('YYYY-MM-DD')
              ] = {marked: true, data: [event]};
            });
          });
        } else {
          data = {};
        }
        return data;
      },
      providesTags: ['bookings'],
    }),
    listBookingsAttachment: builder.query({
      query: ({baseUrl, mbf_mb_id, mod_id}) => {
        return {
          url: `${baseUrl}/api/ModelBooking/Booking/ModelBookingFilesList/${mbf_mb_id}/${mod_id}/`,
          method: 'Get',
        };
      },
      providesTags: ['bookings'],
    }),
    // updateJobStatus: builder.mutation({
    //   query: ({baseUrl, jobId, status, userId}) => ({
    //     url: `${baseUrl}/api/Dashboard/UpdateJobStatus/`,
    //     body: {jobId: jobId, status: status, userId: userId},
    //     method: 'POST',
    //   }),
    //   invalidatesTags: ['bookings'],
    // }),
  }),
  overrideExisting: true,
});

export const {useListBookingsQuery, useListBookingsAttachmentQuery} =
  bookingApi;
