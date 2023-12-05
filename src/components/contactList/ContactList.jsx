import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/actions';

const ContactList = ({ contacts, onDeleteContact }) => {
  const contact = useSelector(state => state.contacts);
  const dispatch = useDispatch();

  const handleClickDelete = deleteId => {
    dispatch(deleteContact(deleteId));
  };

  return (
    <ul>
      {contact.map(contact => (
        <li key={contact.id}>
          {contact.name} {contact.number}
          <button onClick={() => handleClickDelete(contact.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
};

export default ContactList;
