import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../redux/selectors';
import { logOut } from '../redux/operations';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <Typography sx={{ fontSize: '18px' }}>Welcome, {user.name} !</Typography>
      <Button
        onClick={() => dispatch(logOut())}
        variant="outlined"
        sx={{ fontSize: '16px' }}
        color="inherit"
      >
        Log Out
      </Button>
    </Box>
  );
};
