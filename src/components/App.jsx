import React from 'react';
import ContactForm from './contactForm/ContactForm';
import ContactList from './contactList/ContactList';
import Filter from './filter/Filter';
import { useEffect } from 'react';
import {
  addContact,
  addFilter,
  deleteAllContactsForFilter,
  addFilterContact,
} from 'redux/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const COPY_CONTACTS = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);
  const contact = useSelector(state => state.contacts);

  useEffect(() => {
    const contactsJSON = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsJSON);

    if (parsedContacts) {
      dispatch(addFilterContact(parsedContacts));
    }
  }, [dispatch]);

  const handleChangeFilterField = evt => {
    const filterValue = evt.currentTarget.value.toLowerCase();
    dispatch(addFilter(filterValue));

    const filteredContacts = COPY_CONTACTS.filter(contact =>
      contact.name.toLowerCase().includes(filterValue)
    );

    dispatch(deleteAllContactsForFilter());

    dispatch(addFilterContact(filteredContacts));

    if (evt.currentTarget.value === '') {
      dispatch(addFilterContact(COPY_CONTACTS));
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const form = event.target;
    const name = form.elements.name.value;
    const number = form.elements.number.value;

    dispatch(addContact(name, number));

    const nameExists = contact.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (nameExists) {
      alert('ERROR');
      return;
    }

    form.reset();
  };

  return (
    <div>
      <h1>PhoneBook</h1>
      <ContactForm handleSubmit={handleSubmit}></ContactForm>

      <h2>Contacts</h2>
      <Filter
        filter={filter}
        handleChangeFilterField={handleChangeFilterField}
      ></Filter>

      <ContactList contacts={contact}></ContactList>
    </div>
  );
};
