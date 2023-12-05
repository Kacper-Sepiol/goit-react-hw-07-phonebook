import React from 'react';
import ContactForm from './contactForm/ContactForm';
import ContactList from './contactList/ContactList';
import Filter from './filter/Filter';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  fetchContactsThunk,
  fetchContacts,
} from './fetchContacts/FetchContacts';
import {
  addFilter,
  deleteAllContactsForFilter,
  addFilterContact,
} from '../redux/store';

export const App = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);
  const contact = useSelector(state => state.contacts.items);
  const allContacts = useSelector(state => state.contacts.allItems);

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

  const handleChangeFilterField = evt => {
    const filterValue = evt.currentTarget.value.toLowerCase();
    dispatch(addFilter(filterValue));

    const filteredContacts = contact.filter(contact =>
      contact.name.toLowerCase().includes(filterValue)
    );

    dispatch(deleteAllContactsForFilter());

    dispatch(addFilterContact(filteredContacts));

    if (evt.currentTarget.value === '') {
      dispatch(addFilterContact(allContacts));
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const data = {};

    const form = event.target;
    const name = form.elements.name.value;
    const number = form.elements.number.value;

    data.name = name;
    data.phone = number;

    fetchContacts(data);

    delete data.name;
    delete data.phone;

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

      <ContactList></ContactList>
    </div>
  );
};
