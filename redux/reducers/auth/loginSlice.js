import { createSlice } from "@reduxjs/toolkit";
import { postLogin } from "./authApi";
import * as SecureStore from 'expo-secure-store';

const getStore = () => JSON.parse(SecureStore.getItem('user'))
const setStore = (value) => SecureStore.setItem("user", JSON.stringify(value))

const loginSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    data: getStore() ? getStore() : {},
    isModalVisible: false,
    isLogin: false,
    isError: false,
    errorMessage: null,
  },
  reducers: {
    closeModal: (state) => {
      state.isModalVisible = false;
      state.isError = false;
      state.errorMessage = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postLogin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(postLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLogin = true,
      state.data = action.payload;
      setStore(action.payload)
      state.isModalVisible = true;
    });
    builder.addCase(postLogin.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true;
      state.errorMessage = action.payload
      state.isModalVisible = true;
    });
  },
});

export { postLogin };
export const { closeModal } = loginSlice.actions
export const selectUser = state => state.user //selector
export default loginSlice.reducer