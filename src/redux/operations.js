import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};
// Contacts

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post(`../contacts`, contact);
      toast.success('Added new contact');
      return response.data;
    } catch (error) {
      toast.error('Error');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${id}`);
      toast.success('Deleted');
      return response.data;
    } catch (error) {
      toast.error('Error');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const patchContact = createAsyncThunk(
  'contacts/patchContact',
  async ({ id, newName, newNumber }, thunkAPI) => {
    try {
      const response = await axios.patch(`/contacts/${id}`, {
        name: newName,
        number: newNumber,
      });
      toast.success('Updated');
      return response.data;
    } catch (error) {
      toast.error('Error');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Auth

export const register = createAsyncThunk(
  'auth/signup',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`/users/signup`, credentials);
      setAuthHeader(response.data.token);
      toast.success('Successfully registered');
      return response.data;
    } catch (error) {
      toast.error('Ops something went wrong');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`/users/login`, credentials);
      setAuthHeader(response.data.token);
      toast.success('Successfully logged in');
      return response.data;
    } catch (error) {
      toast.error('Ops something went wrong');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await axios.post(`/users/logout`);
    clearAuthHeader();
    toast.success('Successfully logged out');
    return response.data;
  } catch (error) {
    toast.error('Ops something went wrong');
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refresh = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token;
  if (!token) {
    return thunkAPI.rejectWithValue('Unable to fetch user');
  }

  try {
    setAuthHeader(token);
    const response = await axios.get(`/users/current`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
