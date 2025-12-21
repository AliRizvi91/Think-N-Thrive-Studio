import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { toast } from "sonner";
import { ICourse } from "./CourseThunks";

export interface IUser {
  _id: string;
  image: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface IReview {
  _id: string;
  user: IUser; // populated user object
  course: ICourse; // courseId
  comment: string;
  createdAt: string;
  updatedAt: string;
}
export interface UIReview {
  _id: string;
  comment: string;              // UI always needs this
  user?: Partial<IUser>;
  course?: ICourse;
  createdAt?: string;
  updatedAt?: string;
}

// ---- getAllReviews ----
export const getAllReviews = createAsyncThunk<
  IReview[],
  void,
  { state: RootState; rejectValue: string }
>("review/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<IReview[]>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/review`
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch reviews"
    );
  }
});

// ---- getReviewsByCourse ----
export const getReviewsByCourse = createAsyncThunk<
  IReview[],
  string,
  { state: RootState; rejectValue: string }
>("review/getByCourse", async (courseId, { rejectWithValue }) => {
  try {
    const response = await axios.get<IReview[]>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/review/course/${courseId}`
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch course reviews"
    );
  }
});

// ---- postReview ----
export const postReview = createAsyncThunk<
  IReview,
  { user: string | undefined; course: string; comment?: string },
  { state: RootState; rejectValue: string }
>("review/post", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post<IReview>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/review`,
      data,
      { headers: { "Content-Type": "application/json" } }
    );
    if(response){
      toast.success('Comment Posted')
    }
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to create review"
    );
  }
});

// ---- updateReview ----
export const updateReview = createAsyncThunk<
  IReview,
  { id: string; data: { comment?: string } },
  { state: RootState; rejectValue: string }
>("review/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axios.put<IReview>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/review/${id}`,
      data,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to update review"
    );
  }
});

// ---- deleteReview ----
export const deleteReview = createAsyncThunk<
  string,
  string,
  { state: RootState; rejectValue: string }
>("review/delete", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/review/${id}`
    );
    return id;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to delete review"
    );
  }
});
