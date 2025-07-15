import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        user: null


    },
    reducers: {
        addDetails: (state, action) => {
            console.log('addDetails', action.payload.data)
            state.user = action.payload.data;
        },
     updateUserProfile: (state, action) => {
      // Merge the updated data into the existing user profile
      // This allows for partial updates from the backend response
      console.log('action.payload data call',action.payload.data)
      state.user = { ...state.user, ...action.payload.data };
      state.isLoading = false;
      state.error = null;
    },

        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },

});

export const {  setLoading, setError, addDetails, updateUserProfile } = profileSlice.actions;
export default profileSlice.reducer 