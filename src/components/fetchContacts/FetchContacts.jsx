import { createAsyncThunk } from '@reduxjs/toolkit';

const url = 'https://656f0f066529ec1c62373dac.mockapi.io/contacts';

export const fetchAllContacts = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export const fetchContacts = data => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error(error.message));
};

export const fetchDeleteContacts = deleteId => {
  const deleteUrlId =
    'https://656f0f066529ec1c62373dac.mockapi.io/contacts/' + deleteId;

  fetch(deleteUrlId, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('ERROR');
      }
      return response.json();
    })
    .then(data => {
      console.log('Element zostal usuniety:', data);
    })
    .catch(error => {
      console.error('Wystapil blad:', error);
    });
};

export const fetchContactsThunk = createAsyncThunk(
  'contacts/downloadContacts',
  async () => {
    const data = await fetchAllContacts();
    return data;
  }
);
