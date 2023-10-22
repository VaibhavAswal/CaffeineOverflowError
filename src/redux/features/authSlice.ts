import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialState {
  value: AuthState;
}

interface AuthState {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
  isAdmin: boolean;
}

const initialState = {
  value: {
    email: "",
    firstName: "",
    lastName: "",
    isAdmin: false,
    isVerified: false,
    id: "",
  },
} as initialState;
export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.value = {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        isVerified: false,
        isAdmin: false,
      };
    },
    login: (state, action: PayloadAction<AuthState>) => {
      state.value = action.payload;
    },
  },
});

export const { logout, login } = auth.actions;
export default auth.reducer;
