import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from 'sonner';


// Types
interface ErrorPayload {
  message?: string;
  status?: number;
}
interface User {
  _id: string;
  name: string;
  email: string;
  // add more fields as per your backend response
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

interface TokenPayload {
  token: string;
}

interface ResendTokenPayload {
  email: string;
  token: string;
}

interface ResetPasswordPayload {
  token: string;
  password: string;
}

interface UpdateUserPayload {
  id: string;
  formData: Partial<User>;
}

interface ErrorResponse {
  message: string;
}

// getAllUsers
export const getAllUsers = createAsyncThunk<User[]>(
  "Users/All",
  async () => {
    const response = await axios.get<User[]>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/user`
    );
    return response.data;
  }
);

//------ Login ------
export const login = createAsyncThunk<
  LoginResponse,
  LoginData,
  { rejectValue: ErrorResponse }
>(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post<LoginResponse>(
        `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/user/login`,
        data
      );

      toast.success("Verification email sent. Check your inbox.");
      return response.data;

    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      toast.error(error.response?.data?.message || "Login failed");
      return rejectWithValue(
        error.response?.data || { message: "Login failed" }
      );
    }
  }
);



// Token Verification
export const TokenVerification = createAsyncThunk<any, TokenPayload, { rejectValue: ErrorResponse }>(
  "TokenVerification/User",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/user/verify-token`,
        { token }
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      toast.error(error.response?.data?.message || 'Verification failed');
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// ResendToken
export const ResendToken = createAsyncThunk<any, ResendTokenPayload, { rejectValue: ErrorResponse }>(
  "user/resendToken",
  async ({ email, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/user/resend-token`,
        { email, token }
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      toast.error(error.response?.data?.message || 'Verification failed');
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// mailForResetPassword
export const mailForResetPassword = createAsyncThunk<any, { email: string }, { rejectValue: ErrorResponse }>(
  "user/mailResetPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/user/mail-for-reset-password`,
        { email }
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      toast.error(error.response?.data?.message || 'Verification failed');
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// ResetPassword
export const ResetPassword = createAsyncThunk<any, ResetPasswordPayload, { rejectValue: ErrorResponse }>(
  "user/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/user/reset-password`,
        { token, password }
      );

      if (response.status === 200) {
        if (typeof window !== 'undefined') {
          window.location.href = `/response-resetpassword?token=${token}`;
        }
      }

      return response.data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      toast.error(error.response?.data?.message || 'Password reset failed');
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

// Signup
// UserThunks.ts
export const signup = createAsyncThunk<
  { user: User; token: string },  // return type
  { username: string; email: string; password: string; image?: File }, // payload
  { rejectValue: ErrorResponse }
>(
  "signup/User",
  async (formData, { rejectWithValue }) => {
    try {
      const data = new FormData();
      data.append("username", formData.username);
      data.append("email", formData.email);
      data.append("password", formData.password);
      if (formData.image) {
        data.append("image", formData.image); // ✅ attach file
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/user/signup`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("SignUp successfully");
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);


// GetMe
export const getme = createAsyncThunk<User, void, { rejectValue: ErrorPayload }>(
  "getme/User",
  async (_, { rejectWithValue }) => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (!token) {
        return rejectWithValue({
          message: "No token found",
          status: 401
        });
      }

      const response = await axios.get<User>(
        `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/user/profile`,
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to fetch user profile",
        status: error.response?.status || 500
      });
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  "users/updateUser",
  async (
    { id, data }: { id: string; data: FormData },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/user/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);
