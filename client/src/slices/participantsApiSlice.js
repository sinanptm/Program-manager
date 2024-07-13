import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const participantsApiSlice = createApi({
    reducerPath: 'participantsApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Participants'], // Define tag types for caching
    endpoints: (builder) => ({
        getParticipants: builder.query({
            query: () => '/participants',
            providesTags: ['Team', 'Participants'], // Specify tags provided by this endpoint
        }),
        addParticipant: builder.mutation({
            query: (participant) => ({
                url: '/participants',
                method: 'POST',
                body: participant,
            }),
            invalidatesTags: ['Participants'], // Invalidate cached data when adding a participant
        }),
        updateParticipant: builder.mutation({
            query: ({ id, ...participant }) => ({
                url: `/participants/${id}`,
                method: 'PUT',
                body: participant,
            }),
            invalidatesTags: ['Participants'], // Invalidate cached data when updating a participant
        }),
        deleteParticipant: builder.mutation({
            query: (id) => ({
                url: `/participants/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Participants'], // Invalidate cached data when deleting a participant
        }),
        addProgramToParticipant: builder.mutation({
            query: ({ id, programId }) => ({
                url: `/participants/add-program/${id}`,
                method: 'PUT',
                body: { programId },
            }),
            invalidatesTags: ['Participants'], // Invalidate cached data when adding a program to a participant
        }),
    }),
});

export const {
    useGetParticipantsQuery,
    useAddParticipantMutation,
    useUpdateParticipantMutation,
    useDeleteParticipantMutation,
    useAddProgramToParticipantMutation,
} = participantsApiSlice;
