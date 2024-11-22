import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
    credentials: 'include',
});

const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        checkUser: builder.query({
            query: () => ({
                url: '/users/check',
                method: 'GET',
            }),
        }),
    }),
});

export const { useCheckUserQuery } = baseApi;

export default baseApi;