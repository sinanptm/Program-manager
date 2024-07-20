import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const participantsApiSlice = createApi({
    reducerPath: 'participantsApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Participants'],
    endpoints: (builder) => ({
        getParticipants: builder.query({
            query: ({ page = 1, limit = 12 } = {}) => `/participants?page=${page}&limit=${limit}`,
            providesTags: ['Team', 'Participants'], 
        }),
        addParticipant: builder.mutation({
            query: (participant) => ({
                url: '/participants',
                method: 'POST',
                body: participant,
            }),
            invalidatesTags: ['Participants'],
        }),
        updateParticipant: builder.mutation({
            query: ({ id, ...participant }) => ({
                url: `/participants/${id}`,
                method: 'PUT',
                body: participant,
            }),
            invalidatesTags: ['Participants'],
        }),
        deleteParticipant: builder.mutation({
            query: (id) => ({
                url: `/participants/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Participants'], 
        }),
        addProgramToParticipant: builder.mutation({
            query: ({ id, programId }) => ({
                url: `/participants/add-program/${id}`,
                method: 'PUT',
                body: { programId },
            }),
            invalidatesTags: ['Participants','Programs'], 
        }),
    }),
});

export const { 
  useGetParticipantsQuery, 
  useAddParticipantMutation, 
  useUpdateParticipantMutation, 
  useDeleteParticipantMutation, 
  useAddProgramToParticipantMutation 
} = participantsApiSlice;
