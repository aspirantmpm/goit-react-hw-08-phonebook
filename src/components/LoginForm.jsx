import { logIn } from '../redux/operations';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);
    if (email.trim() === '') {
      setEmailError(true);
    }
    if (password.trim() === '') {
      setPasswordError(true);
    }
    if (email.trim() && password.trim()) {
      dispatch(logIn({ email, password }));
    }
  };
  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
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
      <Box noValidate component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          value={email}
          required
          onChange={handleChange}
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoFocus
          autoComplete="off"
          error={emailError}
          {...(emailError && {
            helperText: 'This is a required field',
          })}
        />
        <TextField
          value={password}
          required
          onChange={handleChange}
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="off"
          error={passwordError}
          {...(passwordError && {
            helperText: 'This is a required field',
          })}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 3 }}
        >
          Log In
        </Button>
        <Grid sx={{ textAlign: 'center' }}>
          <Grid item>
            <Link href="/goit-react-hw-08-phonebook/register" variant="body2">
              {"Don't have an account? Register"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
