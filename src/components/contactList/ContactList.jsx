import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/store';
import { fetchDeleteContacts } from 'components/fetchContacts/FetchContacts';

const ContactList = () => {
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

export default ContactList;
