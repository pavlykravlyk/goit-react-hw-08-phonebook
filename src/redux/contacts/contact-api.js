import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com/',

    prepareHeaders: (headers, { getState }) => {
      const token = getState().authSlice.token;
      token && headers.set('authorization', `Bearer ${token}`);

      return headers;
    },
  }),
  tagTypes: ['Contact'],

  endpoints: builder => ({
    getAllContacts: builder.query({
      query: () => `contacts`,
      providesTags: ['Contact'],
    }),

    deleteContact: builder.mutation({
      query: contactId => ({
        url: `contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),

    addContact: builder.mutation({
      query: contact => ({
        url: `contacts`,
        method: 'POST',
        body: contact,
      }),
      invalidatesTags: ['Contact'],
    }),

    editContact: builder.mutation({
      query: ({ id, name, number }) => ({
        url: `contacts/${id}`,
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
