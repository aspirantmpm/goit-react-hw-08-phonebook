import Box from '@mui/material/Box';
import { StyledNavLink } from 'components/GlobalStyle';

export const AuthMenu = () => {
  return (
    <Box sx={{ display: 'flex', gap: 3 }}>
      <StyledNavLink to="/register">Register</StyledNavLink>
      <StyledNavLink to="/login">Log In</StyledNavLink>
    </Box>
  );
};
