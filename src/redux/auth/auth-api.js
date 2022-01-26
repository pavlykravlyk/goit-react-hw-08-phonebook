import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com/users/',

    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = getState().authSlice.token;
      if (token && endpoint !== 'logIn' && endpoint !== 'addUser')
        headers.set('authorization', `Bearer ${token}`);

      return headers;
    },
  }),
  tagTypes: ['User'],

  endpoints: builder => ({
    addUser: builder.mutation({
      query: userContent => ({
        url: `signup`,
        method: 'POST',
        body: userContent,
      }),
      invalidatesTags: ['User'],
    }),

    logIn: builder.mutation({
      query: userContent => ({
        url: `login`,
        method: 'POST',
        body: userContent,
      }),
      invalidatesTags: ['User'],
    }),

    logOut: builder.mutation({
      query: () => ({
        url: `logout`,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    currentUser: builder.mutation({
      query: () => `current`,
      providesTags: ['User'],
    }),
  }),
});

export const {
  useAddUserMutation,
  useLogInMutation,
  useLogOutMutation,
  useCurrentUserMutation,
} = authApi;

export const { addUser, logIn, logOut, currentUser } = authApi.endpoints;
