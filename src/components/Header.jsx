import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'redux/selectors';
import { UserMenu } from 'components/UserMenu';
import { AuthMenu } from 'components/AuthMenu';
import { StyledNavLink } from './GlobalStyle';
import { Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

export const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Container>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <StyledNavLink to="/">Home</StyledNavLink>
              {isLoggedIn && (
                <StyledNavLink to="/contacts">Contacts</StyledNavLink>
              )}
            </Box>
            {isLoggedIn ? <UserMenu /> : <AuthMenu />}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
