import { createSelector } from '@reduxjs/toolkit';
import { contactApi, selectContactsResult } from '.';

const selectAllContacts = createSelector(
  [selectContactsResult],
  contactsResult => contactsResult?.data ?? [],
);

export const getFilterValue = ({ contactFilter }) => contactFilter;

export const getFilteredContacts = createSelector(
  [selectAllContacts, getFilterValue],
  (allContacts, filterValue) => {
    const normalizedFilter = filterValue.toLowerCase();

    return allContacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter),
    );
  },
);
