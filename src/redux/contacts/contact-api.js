import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com/contacts/',

    prepareHeaders: (headers, { getState }) => {
      const token = getState().authSlice.token;
      token && headers.set('authorization', `Bearer ${token}`);

      return headers;
    },
  }),
  tagTypes: ['Contact'],

  endpoints: builder => ({
    getAllContacts: builder.query({
      query: () => ({}),
      providesTags: ['Contact'],
    }),

    deleteContact: builder.mutation({
      query: id => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),

    addContact: builder.mutation({
      query: contact => ({
        method: 'POST',
        body: contact,
      }),
      invalidatesTags: ['Contact'],
    }),

    editContact: builder.mutation({
      query: ({ id, name, number }) => ({
        url: `${id}`,
        method: 'PATCH',
        body: { name, number },
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const {
  useGetAllContactsQuery,
  useDeleteContactMutation,
  useAddContactMutation,
  useEditContactMutation,
} = contactApi;

export const selectContactsResult =
  contactApi.endpoints.getAllContacts.select();
