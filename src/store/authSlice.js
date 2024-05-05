import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authState: false,
  name: "",
  uid: "",
  avatar: ""
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      state.authState = action.payload;
    },
    setAuthName: (state, action)=> {
        state.name = action.payload
    },
    setAuthUid: (state, action)=> {
        state.uid = action.payload
    },
    setAuthAvatar: (state, action)=> {
        state.avatar = action.payload
    },
  },
});

export const { setAuthState, setAuthName, setAuthUid, setAuthAvatar } = authSlice.actions;
export const authReducer = authSlice.reducer;