import { useDispatch } from 'react-redux';
import { Item, Button } from './GlobalStyle';
import { deleteContact } from 'redux/operations';

export const ContactItem = ({ contact }) => {
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteContact(contact.id));
  return (
    <Item key={contact.id}>
      {contact.name}: {contact.phone}
      <Button type="button" onClick={handleDelete}>
        Delete
      </Button>
    </Item>
  );
};
