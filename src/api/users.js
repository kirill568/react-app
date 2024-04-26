import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'userApi',
  keepUnusedDataFor: 30,
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/users/' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/",
      providesTags: ['User'],
    }),
    createUser: builder.mutation({
      query(user) {
        return {
          url: "/",
          method: "POST",
          body: user,
        };
      },
    }),
    updateUser: builder.mutation({
      query({id, user}) {
        return {
          url: `/${id}`,
          method: "PUT",
          body: user,
        };
      }
    }),
    deleteUser: builder.mutation({
      query(id) {
        return {
          url: `/${id}`,
          method: "DELETE",
          credentials: "include",
        };
      },
    }),
  })
})

export const {
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUsersQuery,
} = userApi