import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux/es/exports';
import { deleteContact } from 'redux/operations';
import { useState } from 'react';
import { ContactModal } from 'components/ContactModal';
import { ListItem, ListItemAvatar, Avatar, Fab } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

export const ContactItem = ({ contact: { id, name, number } }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ListItem
      key={id}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: 'solid 1px #1976d2',
        borderRadius: '7px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ListItemAvatar>
          <Avatar
            sx={{ bgcolor: '#1976d2' }}
            alt={name}
            src="/static/images/avatar/1.jpg"
          />
        </ListItemAvatar>
        <Typography
          component="p"
          variant="h5"
          sx={{ display: 'inline', fontSize: { xs: '14px', sm: '23px' } }}
          color="text.primary"
        >
          {name}:{number}
        </Typography>
      </Box>
      <Box>
        <Fab
          onClick={() => handleDelete(id)}
          sx={{
            bgcolor: '#ff1d1d',
            mr: 1,
            ml: 1,
            '&:hover': {
              bgcolor: '#e00404',
            },
          }}
          aria-label="delete"
        >
          <DeleteIcon sx={{ fill: '#FFF' }} />
        </Fab>
        <Fab
          onClick={handleOpen}
          sx={{
            bgcolor: '#1976d2',
            '&:hover': {
              bgcolor: '#0d42d3',
            },
          }}
          aria-label="edit"
        >
          <EditIcon sx={{ fill: '#FFF' }} />
        </Fab>
      </Box>

      <ContactModal
        id={id}
        name={name}
        number={number}
        open={open}
        onClose={handleClose}
      ></ContactModal>
    </ListItem>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
};
