import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
    isLoging: false,
  },
  reducers: {
    setVerifyUserInfo: (state, action) => {
      state.user = action.payload.data;

    },
    addTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },

    reqLoginUser: (state, action) => {
      state.user = action.payload.data;
    },
    getRequestLoginUser: (state, action) => {
      state.user = action.payload.data;
    },
    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.accessTokenExpiry = null;
      state.isLoading = false;
      state.error = null;
      state.otpSent = false;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },

    updateUser: (state, action) => {
      const updatedData = action.payload.data;
      state.user = { ...state.user, ...action.payload.data };

    },
    logout:(state,action)=>{
state.user=null;
state.accessToken=null;
state.refreshToken=null
    }

  },  

});

export const { setVerifyUserInfo, clearAuth, setOtpSent, setLoading, setError, reqLoginUser, addTokens, updateUser,logout } = authSlice.actions;
export default authSlice.reducer;