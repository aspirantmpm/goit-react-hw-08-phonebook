import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    onChange(_, action) {
      return action.payload;
    },
  },
});

export const { onChange } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
