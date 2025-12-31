import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

// ================= TYPES =================

interface ErrorResponse {
  message: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}
export interface ErrorPayload {
  message?: string;
  status?: number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// ================= GET ALL USERS =================

export const getAllUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: ErrorResponse }
>("users/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<ApiResponse<User[]>>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/user`
    );

    return response.data.data;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;
    return rejectWithValue(
      error.response?.data || { message: "Failed to fetch users" }
    );
  }
});

// ================= LOGIN =================

export const login = createAsyncThunk<
  LoginResponse,
  LoginData,
  { rejectValue: ErrorResponse }
>("user/login", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post<ApiResponse<LoginResponse>>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/user/login`,
      data
    );

    toast.success("Email has been send.");
    return response.data.data;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;
    toast.error("Email or password is not corrected");
    return rejectWithValue(
      error.response?.data || { message: "Login failed" }
    );
  }
});

// ================= TOKEN VERIFICATION =================

export const TokenVerification = createAsyncThunk<
  { user: User; token: string },
  { token: string },
  { rejectValue: ErrorResponse }
>(
  "user/verifyToken",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios.post<
        ApiResponse<{ user: User; token: string }>
      >(
        `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/user/verify-token`,
        { token }
      );

      return response.data.data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      toast.error(error.response?.data?.message || "Verification failed");

      return rejectWithValue(
        error.response?.data ?? { message: "Verification failed" }
      );
    }
  }
);


// ================= RESEND TOKEN =================

export const ResendToken = createAsyncThunk<
  string,
  { email: string },
  { rejectValue: ErrorResponse }
>("user/resendToken", async ({ email }, { rejectWithValue }) => {
  try {
    const response = await axios.post<ApiResponse<string>>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/user/resend-token`,
      { email }
    );

    toast.success("Token resent successfully");
    return response.data.data;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;
    toast.error(error.response?.data?.message || "Resend failed");
    return rejectWithValue(
      error.response?.data || { message: "Resend failed" }
    );
  }
});

// ================= MAIL FOR RESET PASSWORD =================

export const mailForResetPassword = createAsyncThunk<
  string,
  { email: string },
  { rejectValue: ErrorResponse }
>("user/mailResetPassword", async ({ email }, { rejectWithValue }) => {
  try {
    const response = await axios.post<ApiResponse<string>>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/user/mail-for-reset-password`,
      { email }
    );

    toast.success("Reset mail sent");
    return response.data.data;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;
    toast.error(error.response?.data?.message || "Mail failed");
    return rejectWithValue(
      error.response?.data || { message: "Mail failed" }
    );
  }
});

// ================= RESET PASSWORD =================

export const ResetPassword = createAsyncThunk<
  string,
  { token: string; password: string },
  { rejectValue: ErrorResponse }
>("user/resetPassword", async ({ token, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post<ApiResponse<string>>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/user/reset-password`,
      { token, password }
    );

    toast.success("Password reset successful");
    return response.data.data;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;
    toast.error(error.response?.data?.message || "Reset failed");
    return rejectWithValue(
      error.response?.data || { message: "Reset failed" }
    );
  }
});

// ================= SIGNUP =================

export const signup = createAsyncThunk<
  { user: User; token: string },
  { username: string; email: string; password: string; image?: File },
  { rejectValue: ErrorResponse }
>("user/signup", async (formData, { rejectWithValue }) => {
  try {
    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (formData.image) data.append("image", formData.image);

    const response = await axios.post(
  `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/user/signup`,
  data
);


    toast.success("Signup successful");

    // ✅ RETURN EXACT BACKEND RESPONSE
    return {
      user: response.data.user,
      token: response.data.token,
    };
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;
    return rejectWithValue(
      error.response?.data || { message: "Signup failed" }
    );
  }
});


// ================= GET ME =================

export const getme = createAsyncThunk<
  User,
  void,
  { rejectValue: ErrorPayload }
>("getme/User", async (_, { rejectWithValue }) => {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      return rejectWithValue({
        message: "No token found",
        status: 401,
      });
    }

    const response = await axios.get<User>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/user/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // ✅ ONLY USER
  } catch (error: any) {
    return rejectWithValue({
      message: error.response?.data?.message || "Failed to fetch user profile",
      status: error.response?.status || 500,
    });
  }
});



// ================= UPDATE USER =================

export const updateUserThunk = createAsyncThunk<
  User,
  { id: string; data: FormData },
  { rejectValue: ErrorResponse }
>("user/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axios.put<ApiResponse<User>>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/user/${id}`,
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    toast.success("Profile updated");
    return response.data.data;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;
    return rejectWithValue(
      error.response?.data || { message: "Update failed" }
    );
  }
});
