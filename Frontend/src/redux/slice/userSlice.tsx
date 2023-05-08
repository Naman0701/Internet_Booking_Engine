import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../interface/DataInterface";
import { RootState } from "../store";

const initialState: UserState = {
  id: "",
  username: "",
  email: "",
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;
      state.email = user.email;
      state.id = user.id;
      state.username = user.username;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.email="";
      state.id="";
      state.username="";
      state.isAuthenticated=false;      
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const authUser = (state: RootState) => state.user;
export default userSlice.reducer;
