import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const participantsApiSlice = createApi({
  reducerPath: 'participantsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Participant'],
  endpoints: (builder) => ({
    getParticipants: builder.query({
      query: () => '/participants',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Participant', id })),
              { type: 'Participant', id: 'LIST' },
            ]
          : [{ type: 'Participant', id: 'LIST' }],
    }),
    getParticipantDetails: builder.query({
      query: (id) => `/participants/${id}`,
      providesTags: (result, error, id) => [{ type: 'Participant', id }],
    }),
    addParticipant: builder.mutation({
      query: (participant) => ({
        url: '/participants',
        method: 'POST',
        body: participant,
      }),
      invalidatesTags: [{ type: 'Participant', id: 'LIST' }],
    }),
    updateParticipant: builder.mutation({
      query: ({ id, participant }) => ({
        url: `/participants/${id}`,
        method: 'PUT',
        body: participant,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Participant', id }],
    }),
    deleteParticipant: builder.mutation({
      query: (id) => ({
        url: `/participants/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Participant', id }],
    }),
  }),
});

export const {
  useGetParticipantsQuery,
  useGetParticipantDetailsQuery,
  useAddParticipantMutation,
  useUpdateParticipantMutation,
  useDeleteParticipantMutation,
} = participantsApiSlice;

export default participantsApiSlice;
