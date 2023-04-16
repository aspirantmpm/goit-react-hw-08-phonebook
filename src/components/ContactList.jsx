import { ContactItem } from './ContactItem';
import { List } from './GlobalStyle';
import { useSelector } from 'react-redux';
import { getVisibleContacts } from '../redux/selectors';

export const ContactList = () => {
  const visibleContacts = useSelector(getVisibleContacts);

  return (
    <List>
      {visibleContacts.map(contact => (
        <ContactItem contact={contact} key={contact.id} />
      ))}
    </List>
  );
};
