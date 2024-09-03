import useLocalStorage from "@/hooks/useLocalStorage";
import { createSlice } from "@reduxjs/toolkit";

// Define the type for access levels
type Access = "admin" | "user" | "guest";

// Define the shape of the state
interface UserState {
          user: string | null; // You can replace 'any' with a more specific type for user
          access: Access;
}

// Initialize the state
const initialState: UserState = {
          user: null,
          access: "guest"
};

const authSlice = createSlice({
          name: "auth",
          initialState,
          reducers: {
                    login: (state, action) => {
                              state.user = action.payload.user;
                              state.access = action.payload.access;
                    },
                    logout: (state) => {
                              state.user = null;
                              state.access = "guest";
                    }
          }
})
