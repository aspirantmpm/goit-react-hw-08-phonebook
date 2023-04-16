import React, { useEffect } from 'react';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { ContactFind } from './ContactFind';
import { Section, Title } from './GlobalStyle';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getIsLoading, getError } from 'redux/selectors';
import { fetchContacts } from 'redux/operations';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Section>
      <Title>Phonebook</Title>
      <ContactForm />
      <>
        {isLoading && !error && <b>Request in progress...</b>}
        {contacts?.length > 0 && (
          <>
            <Title>Contacts</Title>
            <ContactFind />
            <ContactList />
          </>
        )}
      </>
    </Section>
  );
};
