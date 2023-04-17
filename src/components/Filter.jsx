import { useDispatch, useSelector } from 'react-redux/es/exports';
import { onChange } from 'redux/filterSlice';
import { selectFilter } from 'redux/selectors';
import { Typography, TextField } from '@mui/material';
import { Box } from '@mui/system';

export const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const changeFilter = e => {
    const { value } = e.currentTarget;
    dispatch(onChange(value));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        maxWidth: '462px',
        mr: 'auto',
        ml: 'auto',
        mt: 2,
      }}
    >
      <Typography sx={{ mb: 1 }} component="p" variant="h5">
        Find contacts by name
      </Typography>
      <TextField
        fullWidth
        type="text"
        value={filter}
        onChange={changeFilter}
        id="filled-error"
        label="Filter"
        variant="filled"
      />
    </Box>
  );
};
