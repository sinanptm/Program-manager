import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const programsApiSlice = createApi({
    reducerPath: 'programsApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Program'],
    endpoints: (builder) => ({
        getPrograms: builder.query({
            query: () => '/programs',
            providesTags: ['Program'], 
        }),
        getProgram:builder.query({
            query:({id})=> `/programs/${id}`,
            providesTags:['Program']
        }),
        addProgram: builder.mutation({
            query: (program) => ({
                url: '/programs',
                method: 'POST',
                body: program,
            }),
            invalidatesTags: ['Program'],  // Invalidate cache when a new program is added
        }),
        updateProgram: builder.mutation({
            query: ({ id, ...program }) => ({
                url: `/programs/${id}`,
                method: 'PUT',
                body: program,
            }),
            invalidatesTags: ['Program'],  // Invalidate cache when a program is updated
        }),
        deleteProgram: builder.mutation({
            query: (id) => ({
                url: `/programs/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Program'],  // Invalidate cache when a program is deleted
        }),
        setWinners: builder.mutation({
            query: (winners) => ({
                url: '/programs/set-winner',
                method: 'PUT',
                body: winners,
            }),
            invalidatesTags: ['Program'],  // Invalidate cache when winners are set
        }),
    }),
});

export const {
    useGetProgramsQuery,
    useGetProgramQuery,
    useAddProgramMutation,
    useUpdateProgramMutation,
    useDeleteProgramMutation,
    useSetWinnersMutation,
} = programsApiSlice;
