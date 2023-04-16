import React, { useState } from 'react';
import { Formik } from 'formik';
import { MainForm, Button, Label, Input } from './GlobalStyle';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../redux/operations';
import { getContacts } from '../redux/selectors';
import { nanoid } from 'nanoid';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onChangeName = e => setName(e.currentTarget.value);
  const onChangeNumber = e => setNumber(e.currentTarget.value);

  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = event => {
    const newContact = { id: nanoid(), name, number };

    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    dispatch(addContact(newContact));
    setName('');
    setNumber('');
  };

  return (
    <Formik initialValues={{ name: '', number: '' }} onSubmit={handleSubmit}>
      <MainForm autoComplete="off">
        <div>
          <Label htmlFor="name">Name</Label>
          <div>
            <Input
              onChange={onChangeName}
              value={name}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="number">Number</Label>
          <div>
            <Input
              onChange={onChangeNumber}
              value={number}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </div>
        </div>
        <Button type="submit">Add contact</Button>
      </MainForm>
    </Formik>
  );
};
