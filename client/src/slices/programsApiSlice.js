// slices/programsApiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const programsApiSlice = createApi({
    reducerPath: 'programsApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Program'],
    endpoints: (builder) => ({
        getPrograms: builder.query({
            query: () => '/programs',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Program', id })),
                        { type: 'Program', id: 'LIST' },
                      ]
                    : [{ type: 'Program', id: 'LIST' }],
        }),
        addProgram: builder.mutation({
            query: ({ name, category, type }) => ({
                url: '/programs',
                method: 'POST',
                body: { name, category, type },
            }),
            invalidatesTags: [{ type: 'Program', id: 'LIST' }],
        }),
        updateProgram: builder.mutation({
            query: ({ id, name, category, type }) => ({
                url: `/programs/${id}`,
                method: 'PUT',
                body: { name, category, type },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Program', id }],
        }),
        deleteProgram: builder.mutation({
            query: (id) => ({
                url: `/programs/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Program', id }],
        }),
        setWinners: builder.mutation({
            query: ({ id, firstPlace, secondPlace, thirdPlace }) => ({
                url: '/programs/set-winner',
                method: 'PUT',
                body: { id, firstPlace, secondPlace, thirdPlace },
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Program', id },
                { type: 'Participant', id: firstPlace.participant },
                { type: 'Participant', id: secondPlace.participant },
                { type: 'Participant', id: thirdPlace.participant },
                { type: 'Team', id: firstPlace.team },
                { type: 'Team', id: secondPlace.team },
                { type: 'Team', id: thirdPlace.team },
            ],
        }),
    }),
});

export const {
    useGetProgramsQuery,
    useAddProgramMutation,
    useUpdateProgramMutation,
    useDeleteProgramMutation,
    useSetWinnersMutation,
} = programsApiSlice;

export default programsApiSlice;
