import { createSelector } from '@reduxjs/toolkit';
import { contactApi } from '../contacts';

export const getFilterValue = ({ contactFilter }) => contactFilter;

const selectContactsResult = contactApi.endpoints.getAllContacts.select();

const selectAllContacts = createSelector(
  [selectContactsResult],
  contactsResult => contactsResult?.data ?? [],
);

export const getFilteredContacts = createSelector(
  [selectAllContacts, getFilterValue],
  (allContacts, filterValue) => {
    const normalizedFilter = filterValue.toLowerCase();

    return allContacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter),
    );
  },
);
