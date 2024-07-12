// slices/teamsApiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const teamsApiSlice = createApi({
    reducerPath: 'teamsApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Team'],
    endpoints: (builder) => ({
        getTeams: builder.query({
            query: () => '/teams',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Team', id })),
                        { type: 'Team', id: 'LIST' },
                      ]
                    : [{ type: 'Team', id: 'LIST' }],
        }),
        getTeamDetails: builder.query({
            query: (id) => `/teams/${id}`,
            providesTags: (result, error, id) => [{ type: 'Team', id }],
        }),
        addTeam: builder.mutation({
            query: (name) => ({
                url: '/teams',
                method: 'POST',
                body: { name },
            }),
            invalidatesTags: [{ type: 'Team', id: 'LIST' }],
        }),
        updateTeam: builder.mutation({
            query: ({ id, name }) => ({
                url: `/teams/${id}`,
                method: 'PUT',
                body: { name },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Team', id }],
        }),
        deleteTeam: builder.mutation({
            query: (id) => ({
                url: `/teams/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Team', id }],
        }),
    }),
});

export const {
    useGetTeamsQuery,
    useGetTeamDetailsQuery,
    useAddTeamMutation,
    useUpdateTeamMutation,
    useDeleteTeamMutation,
} = teamsApiSlice;

export default teamsApiSlice;
