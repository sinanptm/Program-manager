import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const programsApiSlice = createApi({
    reducerPath: 'programsApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Program'],
    endpoints: (builder) => ({
        getPrograms: builder.query({
            query: ({ page = 0, limit = 0, status = "", category = "", search = "" }={}) => {
                let queryString = `/programs?page=${page}&limit=${limit}`;
                if (status) queryString += `&status=${status}`;
                if (category) queryString += `&category=${category}`;
                if (search) queryString += `&search=${search}`;
                return queryString;
            },
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
            invalidatesTags: ['Program'],  
        }),
        updateProgram: builder.mutation({
            query: ({ id, ...program }) => ({
                url: `/programs/${id}`,
                method: 'PUT',
                body: program,
            }),
            invalidatesTags: ['Program'], 
        }),
        deleteProgram: builder.mutation({
            query: (id) => ({
                url: `/programs/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Program'],  
        }),
        setWinners: builder.mutation({
            query: (winners) => ({
                url: '/programs/set-winner',
                method: 'PUT',
                body: winners,
            }),
            invalidatesTags: ['Program'], 
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
