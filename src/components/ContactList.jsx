import { useSelector, useDispatch } from 'react-redux/es/exports';
import { useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import {
  selectError,
  selectFilter,
  selectIsLoading,
  selectVisibleContacts,
} from 'redux/selectors';
import { fetchContacts } from 'redux/operations';
import { ContactItem } from './ContactItem';
import { Box, List } from '@mui/material';
import Typography from '@mui/material/Typography';

export const ContactList = () => {
  const dispatch = useDispatch();
  const visibleContacts = useSelector(selectVisibleContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      {isLoading && (
        <ThreeDots
          height="80"
          width="80"
          radius="7"
          color="#1976d2"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      )}
      {error && (
        <Typography mt="20px" component="p" variant="h4">
          {error}
        </Typography>
      )}
      {visibleContacts.length === 0 && !isLoading && filter && (
        <Typography mt="20px" component="p" variant="h4">
          Contacts with filter "{filter}" not found
        </Typography>
      )}
      {visibleContacts.length === 0 && !isLoading && !filter && (
        <Typography mt="20px" component="p" variant="h4">
          Phonebook is empty
        </Typography>
      )}

      <List
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 1,
          mt: 2,
          maxWidth: '900',
        }}
      >
        {visibleContacts.map(contact => {
          return <ContactItem key={contact.id} contact={contact} />;
        })}
      </List>
    </Box>
  );
};
