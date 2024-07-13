import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const participantsApiSlice = createApi({
    reducerPath: 'participantsApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (builder) => ({
        getParticipants: builder.query({
            query: () => '/participants',
        }),
        addParticipant: builder.mutation({
            query: (participant) => ({
                url: '/participants',
                method: 'POST',
                body: participant,
            }),
        }),
        updateParticipant: builder.mutation({
            query: ({ id, ...participant }) => ({
                url: `/participants/${id}`,
                method: 'PUT',
                body: participant,
            }),
        }),
        deleteParticipant: builder.mutation({
            query: (id) => ({
                url: `/participants/${id}`,
                method: 'DELETE',
            }),
        }),
        addProgramToParticipant: builder.mutation({
            query: ({ id, programId }) => ({
                url: `/participants/add-program/${id}`,
                method: 'PUT',
                body: { programId },
            }),
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
