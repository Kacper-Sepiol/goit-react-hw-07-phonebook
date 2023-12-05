import { configureStore, createReducer } from '@reduxjs/toolkit';
import {
  addContact,
  deleteContact,
  addFilter,
  deleteAllContactsForFilter,
  addFilterContact,
} from './actions';

const appState = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
};

const contactsReducer = createReducer(appState, builder => {
  builder
    .addCase(addContact, (state, action) => {
      state.contacts.push(action.payload);
    })
    .addCase(addFilterContact, (state, action) => {
      state.contacts = action.payload;
    })
    .addCase(deleteContact, (state, action) => {
      const index = state.contacts.findIndex(
        contact => contact.id === action.payload
      );
      if (index !== -1) {
        state.contacts.splice(index, 1);
      }
    })
    .addCase(deleteAllContactsForFilter, (state, action) => {
      state.contacts = [];
    })
    .addCase(addFilter, (state, action) => {
      state.filter = action.payload.toLowerCase();
    });
});

export const store = configureStore({
  reducer: contactsReducer,
});
