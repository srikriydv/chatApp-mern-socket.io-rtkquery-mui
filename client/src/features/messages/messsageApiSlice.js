import baseApi from "../api/baseApiSlice";

const messageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: '/messages/users',
                method: 'GET'
            }),
        }),
        getMessages: builder.query({
            query: (id) => ({
                url: `/messages/${id}`,
                method: 'GET'
            }),
        }),
        sendMessage: builder.mutation({
            query: ({id, data}) => ({
                url: `/messages/send/${id}`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useGetUsersQuery, useGetMessagesQuery, useSendMessageMutation } = messageApi;