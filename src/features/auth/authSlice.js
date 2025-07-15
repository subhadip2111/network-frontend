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
      console.log("setVerifyUserInfo called with payload:", action.payload);

      state.user = action.payload.data;

    },
    addTokens: (state, action) => {
      console.log("addTokens called with payload:", action.payload);
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },

    reqLoginUser: (state, action) => {
      state.user = action.payload.data;
      console.log("reqLoginUser called with payload:", action.payload);
    },
    getRequestLoginUser: (state, action) => {
      state.user = action.payload.data;
      console.log("getRequestLoginUser called with payload:", action.payload);
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
      console.log('updated user after  profile was updted ', updatedData)

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