import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';

////////////////////// CONTACTS ///////////////////////////////

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://61dc82a1591c3a0017e1a9c0.mockapi.io/api/v1/',
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
      query: (name, number) => ({
        url: `contacts`,
        method: 'POST',
        body: name,
        number,
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

console.log(contactApi);

export const {
  useGetAllContactsQuery,
  useDeleteContactMutation,
  useAddContactMutation,
} = contactApi;

////////////////////// FILTER ///////////////////////////////

export const filterSlice = createSlice({
  name: 'contactFilter',
  initialState: '',

  reducers: {
    changeFilter: (_, { payload }) => payload,
  },
});

export const { changeFilter } = filterSlice.actions;
