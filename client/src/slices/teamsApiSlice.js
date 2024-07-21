import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const teamsApiSlice = createApi({
    reducerPath: 'teamsApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Team'], 
    endpoints: (builder) => ({
        getTeams: builder.query({
            query: ({ page = 1, limit = 10, search = "" } = {}) => 
              `/teams?page=${page}&limit=${limit}&search=${search}`, 
            providesTags: ['Team'],
          }),
        addTeam: builder.mutation({
            query: (team) => ({
                url: '/teams',
                method: 'POST',
                body: team,
            }),
            invalidatesTags: ['Team'], 
        }),
        deleteTeam: builder.mutation({
            query: (id) => ({
                url: `/teams/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Team'], 
        }),
    }),
});

export const {
    useGetTeamsQuery,
    useAddTeamMutation,
    useDeleteTeamMutation,
} = teamsApiSlice;
