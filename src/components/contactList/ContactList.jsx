import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/store';
import { fetchAllContacts } from 'components/fetchContacts/FetchContacts';
import { useState, useEffect } from 'react';
import { fetchDeleteContacts } from 'components/fetchContacts/FetchContacts';

const ContactList = ({ onDeleteContact }) => {
  const contact = useSelector(state => state.contacts.items);
  const dispatch = useDispatch();

  const handleClickDelete = deleteId => {
    fetchDeleteContacts(deleteId);
    dispatch(deleteContact(deleteId));
  };

  return (
    <ul>
      {contact.map(contact => (
        <li key={contact.id}>
          {contact.name} {contact.phone}
          <button onClick={() => handleClickDelete(contact.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

// ContactList.propTypes = {
//   contacts: PropTypes.array.isRequired,
// };

export default ContactList;
