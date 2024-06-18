import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState:{
    login:{
      currentUser: null,
      isFetching: false,
      error: false
    },
    register:{
      isFetching: false,
      error: false,
      success: false
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.error = false;
      state.login.currentUser = action.payload;
    },
    loginFailed: (state, action) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.register.isFetching = false;
      state.register.error = false;
      state.register.success = true;
    },
    registerFailed: (state, action) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.success = false;
    },
    increment: (state) => {
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginFailed, registerStart, registerSuccess, registerFailed, increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer