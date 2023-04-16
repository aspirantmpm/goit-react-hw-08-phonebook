import { createSelector } from '@reduxjs/toolkit';

export const getContacts = state => state.contacts.items;

export const getFilter = state => state.filter;

export const getIsLoading = state => state.contacts.isLoading;

export const getError = state => state.contacts.error;

export const getVisibleContacts = createSelector(
  [getContacts, getFilter],
  (contacts, filters) => {
    if (filters !== '') {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filters.toLowerCase())
      );
    }
    return contacts;
  }
);
