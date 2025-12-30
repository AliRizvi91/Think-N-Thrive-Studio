"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import {
  login,
  TokenVerification,
  signup,
  getme,
  getAllUsers,
  updateUserThunk,
  ErrorPayload
} from "../thunks/UserThunks";

interface User {
  _id?: string;
  name?: string;
  email?: string;
  [key: string]: any; // Immer compatible
}



interface UserState {
  user: User | null;
  AllUsers: User[];
  VerifyEmail: boolean;
  setNavbar: boolean;
  token: string | null;
  loading: boolean;
  appLoaded: boolean;
  authChecked: boolean;
  error: ErrorPayload | null;
  currentLang: string;
}

// Helper function to safely access localStorage
const getInitialToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || null;
  }
  return null;
};

// Initial State
const initialState: UserState = {
  user: null,
  AllUsers: [],
  VerifyEmail: false,
  setNavbar: false,
  token: getInitialToken(),
  appLoaded: false,
  authChecked: false,
  loading: false,
  error: null,
  currentLang: "en",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    verifiedEmail(state, action: PayloadAction<boolean>) {
      state.VerifyEmail = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      if (typeof window !== "undefined") localStorage.removeItem("token");
    },
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
      if (typeof window !== "undefined")
        localStorage.setItem("token", action.payload.token);
    },
    appLoadedReducer(state, action: PayloadAction<boolean>) {
      state.appLoaded = action.payload;
    },
    authChecked(state, action: PayloadAction<boolean>) {
      state.authChecked = action.payload;
    },
    clearToken(state) {
      state.token = null;
      if (typeof window !== "undefined") localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // ---------------- Login ----------------
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        if (typeof window !== "undefined")
          localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorPayload || { message: "Login failed" };
      });

    // ---------------- Token Verification ----------------
    builder
      .addCase(TokenVerification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(TokenVerification.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        if (typeof window !== "undefined")
          localStorage.setItem("token", action.payload.token);
      })
      .addCase(TokenVerification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorPayload;
        toast.error(action.payload?.message || "Email verification failed");
      });

    // ---------------- Signup ----------------
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;

        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorPayload;
      });

    // ---------------- GetMe ----------------
    builder
      .addCase(getme.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getme.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload.user; // ✅ correct
        state.error = null;
      })


      .addCase(getme.rejected, (state, action) => {
        state.loading = false;
        const errorPayload = action.payload as ErrorPayload | undefined;
        state.error = errorPayload || { message: action.error.message };

        // Auto logout on 401/403
        if (errorPayload?.status === 401 || errorPayload?.status === 403) {
          state.token = null;
          state.user = null;
          if (typeof window !== "undefined") localStorage.removeItem("token");
          toast.error("Session expired. Please login again.");
        }
      });

    // ---------------- GetAllUsers ----------------
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.AllUsers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = { message: action.error.message } as ErrorPayload;
      });

    // ---------------- Update User ----------------
    builder
      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        const updatedUser = action.payload;

        // Update AllUsers
        const index = state.AllUsers.findIndex((u) => u._id === updatedUser._id);
        if (index !== -1) state.AllUsers[index] = updatedUser;

        // Update logged-in user
        if (state.user?._id === updatedUser._id) state.user = updatedUser;

        toast.success("User updated successfully");
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loading = false;
        const error = action.payload as ErrorPayload | undefined;
        state.error = error || { message: "Update failed" };
        toast.error(error?.message || "Update failed");
      });
  },
});

export const {
  logout,
  setCredentials,
  verifiedEmail,
  appLoadedReducer,
  authChecked,
  clearToken,
} = userSlice.actions;

export default userSlice.reducer;
