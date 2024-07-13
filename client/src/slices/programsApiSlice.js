import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const programsApiSlice = createApi({
    reducerPath: 'programsApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (builder) => ({
        getPrograms: builder.query({
            query: () => '/programs',
        }),
        addProgram: builder.mutation({
            query: (program) => ({
                url: '/programs',
                method: 'POST',
                body: program,
            }),
        }),
        updateProgram: builder.mutation({
            query: ({ id, ...program }) => ({
                url: `/programs/${id}`,
                method: 'PUT',
                body: program,
            }),
        }),
        deleteProgram: builder.mutation({
            query: (id) => ({
                url: `/programs/${id}`,
                method: 'DELETE',
            }),
        }),
        setWinners: builder.mutation({
            query: (winners) => ({
                url: '/programs/set-winner',
                method: 'PUT',
                body: winners,
            }),
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
