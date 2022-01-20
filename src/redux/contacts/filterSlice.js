import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'contactFilter',
  initialState: '',

  reducers: {
    changeFilter: (_, { payload }) => payload,
  },
});

export const { changeFilter } = filterSlice.actions;
