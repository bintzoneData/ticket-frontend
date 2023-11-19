import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const CateData = JSON.parse(localStorage.getItem('CateData'));
const ItemsData = JSON.parse(localStorage.getItem('ItemsData'));
const API_URL1 = 'api/categories';

const initialState = {
  CateData: CateData ? CateData : null,
  ItemsData: ItemsData ? ItemsData : null,
  isError1: false,
  isError2: false,
  isLoading1: false,
  isLoading2: false,
  isSuccess1: false,
  isSuccess2: false,
  message1: '',
  message2: '',
};
const fetchCate = async () => {
  const response = await axios.get(API_URL1);
  if (response.data) {
    localStorage.setItem('CateData', JSON.stringify(response.data));
  }
  return response.data;
};
const fetchItems = async (query) => {
  const response = await axios.get(`api/items?category=${query}`);
  if (response.data) {
    localStorage.setItem('CateData', JSON.stringify(response.data));
  }
  return response.data;
};

export const getCategories = createAsyncThunk(
  'auth/categories',
  async (thunkApi) => {
    try {
      return await fetchCate();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const getItems = createAsyncThunk(
  'auth/items',
  async (query, thunkApi) => {
    try {
      return await fetchItems(query);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const authMix = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading1 = false;
      state.isError1 = false;
      state.isSuccess1 = false;
      state.message1 = '';
      state.isLoading2 = false;
      state.isError2 = false;
      state.isSuccess2 = false;
      state.message2 = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading1 = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading1 = false;
        state.isSuccess1 = true;
        state.CateData = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading1 = false;
        state.isError1 = true;
        state.message1 = action.payload;
        state.CateData = null;
      });
    builder
      .addCase(getItems.pending, (state) => {
        state.isLoading2 = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.isLoading2 = false;
        state.isSuccess2 = true;
        state.ItemsData = action.payload;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.isLoading2 = false;
        state.isError2 = true;
        state.message2 = action.payload;
        state.ItemsData = null;
      });
  },
});
export const { reset } = authMix.actions;
export default authMix.reducer;
