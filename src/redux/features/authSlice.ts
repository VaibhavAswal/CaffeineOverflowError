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
}

const initialState = {
  value: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    isVerified: false,
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
      };
    },
    login: (state, action: PayloadAction<AuthState>) => {
      state.value = action.payload;
    },
  },
});

export const { logout, login } = auth.actions;
export default auth.reducer;
