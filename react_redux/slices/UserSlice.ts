"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, TokenVerification, signup, getme, getAllUsers, LoginResponse ,updateUserThunk  } from "../thunks/UserThunks";
import { toast } from "sonner";

interface User {
  _id?: string;
  name?: string;
  email?: string;
  [key: string]: any; // ✔ Immer compatible
}



interface ErrorPayload {
  message?: string;
  status?: number;
}

interface UserState {
  user: User | null;
  AllUsers: User[];
  VerifyEmail: boolean;
  setNavbar: boolean;
  token: string | null;
  loading: boolean;
  appLoaded: boolean
  authChecked: boolean
  error: ErrorPayload | null;
  currentLang: string;   // 🔹 add this
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
  currentLang: "en", // 🔹 default language
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
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload?.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    },
      appLoaded: (state, action) => {
    state.appLoaded = action.payload;
  },
  authChecked: (state, action) => {
    state.authChecked = action.payload;
  },
  
    clearToken: (state) => {
      state.token = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },

  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;

        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token);
        }
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as ErrorPayload) || { message: "Login failed" };
      })

      // Token Verification
      .addCase(TokenVerification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(TokenVerification.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.user = action.payload?.user;
        state.token = action.payload.token;
        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token);
        }
        toast.success("Email verified successfully!");
      })
      .addCase(TokenVerification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorPayload;
        toast.error(action.payload?.message || "Email verification failed");
      })

      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.user = action.payload?.user;
        state.token = action.payload.token;
        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorPayload;
      })

      // GetMe - Updated to handle token removal on rejection
      .addCase(getme.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getme.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload?.user;
        state.error = null;
      })
      .addCase(getme.rejected, (state, action) => {
        state.loading = false;
        const errorPayload = action.payload as ErrorPayload | undefined;
        state.error = errorPayload || { message: action.error.message };
        
        if (errorPayload?.status === 401 || errorPayload?.status === 403) {
          state.token = null;
          state.user = null;
          
          if (typeof window !== "undefined") {
            localStorage.removeItem("token");
          }
          toast.error("Session expired. Please login again.");
        }
      })

      // GetAllUsers
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
      })
      // Update User
.addCase(updateUserThunk.pending, (state) => {
  state.loading = true;
  state.error = null;
})

.addCase(updateUserThunk.fulfilled, (state, action) => {
  state.loading = false;

  const updatedUser = action.payload;

  // ✅ AllUsers update
  const index = state.AllUsers.findIndex(
    (u) => u._id === updatedUser._id
  );
  if (index !== -1) {
    state.AllUsers[index] = updatedUser;
  }

  // ✅ Logged-in user update
  if (state.user?._id === updatedUser._id) {
    state.user = updatedUser;
  }

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

export const { logout, setCredentials, verifiedEmail, appLoaded, authChecked, clearToken } = userSlice.actions;
export default userSlice.reducer;