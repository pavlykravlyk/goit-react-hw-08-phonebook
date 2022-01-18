import { createSelector } from '@reduxjs/toolkit';
import { contactApi } from './slice';

const selectContactsResult = contactApi.endpoints.getAllContacts.select();

const selectAllContacts = createSelector(
  selectContactsResult,
  contactsResult => {
    console.log(contactsResult);
    return contactsResult?.data ?? [];
  },
);

export const getFilterValue = state => state.contactFilter;

export const getFilteredContacts = createSelector(
  [selectAllContacts, getFilterValue],
  (allContacts, filterValue) => {
    const normalizedFilter = filterValue.toLowerCase();

    return allContacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter),
    );
  },
);
