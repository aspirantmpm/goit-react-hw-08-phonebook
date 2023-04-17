import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { register } from 'redux/operations';
import { validateEmail, validatePassword } from 'components/validations';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (name === '') {
      return;
    }
    if (name.trim() === '') {
      setNameError(true);
    } else {
      setNameError(false);
    }
  }, [name, nameError]);
  useEffect(() => {
    if (email === '') {
      return;
    }
    if (!validateEmail(email.trim())) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }, [email, emailError]);

  useEffect(() => {
    if (password === '') {
      return;
    }
    if (!validatePassword(password.trim())) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [password, passwordError]);

  const handleSubmit = e => {
    e.preventDefault();
    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
      setNameError(true);
      setEmailError(true);
      setPasswordError(true);
      return;
    }
    if (!nameError && !emailError && !passwordError) {
      dispatch(register({ name, email, password }));
    }
  };

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        return;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box noValidate component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              value={name}
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="off"
              onChange={handleChange}
              error={nameError}
              {...(nameError && {
                helperText: 'This is a required field',
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              value={email}
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              onChange={handleChange}
              error={emailError}
              {...(emailError && { helperText: 'Your email is invalid' })}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              value={password}
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="off"
              onChange={handleChange}
              error={passwordError}
              {...(passwordError && {
                helperText:
                  'Password minimum length must be 8 and contain at least 1 big and 1 small letter and 1 number ',
              })}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </Button>
        <Grid container justifyContent="center">
          <Grid item>
            <Link href="/goit-react-hw-08-phonebook/login" variant="body2">
              Already have an account? Log In
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
