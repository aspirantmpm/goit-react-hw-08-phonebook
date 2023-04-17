import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { patchContact } from 'redux/operations';
import { selectContacts } from 'redux/selectors';
import { validateName, validateNumber } from 'components/validations';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import { Fab, TextField } from '@mui/material';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #1976d2',
  boxShadow: 24,
  p: 4,
};

export const ContactModal = ({ name, number, id, open, onClose }) => {
  const dispatch = useDispatch();
  const [newName, setNewName] = useState(name);
  const [newNumber, setNewNumber] = useState(number);
  const [newNameIsValid, setNewNameIsValid] = useState(true);
  const [newNumberIsValid, setNewNumberIsValid] = useState(true);

  const contacts = useSelector(selectContacts);

  const checkContact = value => {
    const isInContacts = contacts.some(
      ({ name }) => name.toLowerCase() === value.toLowerCase()
    );
    return isInContacts;
  };

  useEffect(() => {
    if (validateName(newName.trim())) {
      setNewNameIsValid(true);
    } else {
      setNewNameIsValid(false);
    }
  }, [newName]);
  useEffect(() => {
    if (validateNumber(newNumber.trim())) {
      setNewNumberIsValid(true);
    } else {
      setNewNumberIsValid(false);
    }
  }, [newNumber]);

  const handleSubmit = e => {
    e.preventDefault();
    if (checkContact(newName.trim())) {
      const currentContact = contacts.find(
        ({ name }) => name.toLowerCase().trim() === newName.toLowerCase().trim()
      );
      if (currentContact.id !== id) {
        return toast.error(`${newName} is already in contacts.`);
      }
    }
    dispatch(
      patchContact({
        id,
        newName,
        newNumber,
      })
    );
    onClose();
  };
  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setNewName(value);
        break;
      case 'number':
        setNewNumber(value);
        break;
      default:
        return;
    }
  };
  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          setNewName(name);
          setNewNumber(number);
          return onClose();
        }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Fab
              color="primary"
              sx={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                width: '40px',
                height: '40px',
              }}
              type="button"
              aria-label="close-modal"
              onClick={() => {
                setNewName(name);
                setNewNumber(number);
                return onClose();
              }}
            >
              <ClearIcon fontSize="small" />
            </Fab>
            <form onSubmit={handleSubmit}>
              <Typography
                textAlign="center"
                mb="15px"
                variant="h6"
                component="h2"
              >
                Edit your contact
              </Typography>
              <TextField
                autoComplete="off"
                label="Name to change"
                fullWidth
                name="name"
                type="text"
                onChange={handleChange}
                value={newName}
              />
              <TextField
                autoComplete="off"
                sx={{ mb: 2, mt: 2 }}
                label="Number to change"
                fullWidth
                name="number"
                type="tel"
                onChange={handleChange}
                value={newNumber}
              />
              <Button
                fullWidth
                sx={{ fontSize: '15px' }}
                variant="outlined"
                type="submit"
                disabled={
                  !newNameIsValid ||
                  !newNumberIsValid ||
                  (name.trim() === newName.trim() && number.trim()) ===
                    newNumber.trim()
                }
              >
                Update
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

ContactModal.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  }),
};
