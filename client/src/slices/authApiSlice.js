import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const authApiSlice = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:"/api"}),
    endpoints:builder=>({
        login:builder.mutation({
            query:({email,password})=>({
                url:'/login',
                method:"POST",
                body:{email,password}
            })
        })
    })
})

export const { useLoginMutation } = authApiSlice