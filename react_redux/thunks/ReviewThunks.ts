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
  user: IUser;       // populated user
  course: ICourse;   // populated course
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface UIReview {
  _id: string;
  comment: string;
  user?: Partial<IUser>;
  course?: ICourse;
  createdAt?: string;
  updatedAt?: string;
}

/* ---------------- GET ALL REVIEWS ---------------- */
export const getAllReviews = createAsyncThunk<
  IReview[],
  void,
  { state: RootState; rejectValue: string }
>("review/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<{ success: boolean; data: IReview[] }>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/review`
    );

    return Array.isArray(response.data.data) ? response.data.data : [];
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch reviews"
    );
  }
});

/* ---------------- GET REVIEWS BY COURSE ---------------- */
export const getReviewsByCourse = createAsyncThunk<
  IReview[],
  string,
  { state: RootState; rejectValue: string }
>("review/getByCourse", async (courseId, { rejectWithValue }) => {
  try {
    const response = await axios.get<{ success: boolean; data: IReview[] }>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/review/course/${courseId}`
    );

    return Array.isArray(response.data.data) ? response.data.data : [];
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch course reviews"
    );
  }
});

/* ---------------- POST REVIEW ---------------- */
export const postReview = createAsyncThunk<
  IReview,
  { user?: string; course: string; comment?: string },
  { state: RootState; rejectValue: string }
>("review/post", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post<{ success: boolean; data: IReview }>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/review`,
      data,
      { headers: { "Content-Type": "application/json" } }
    );

    toast.success("Comment Posted");
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to create review"
    );
  }
});

/* ---------------- UPDATE REVIEW ---------------- */
export const updateReview = createAsyncThunk<
  IReview,
  { id: string; data: { comment?: string } },
  { state: RootState; rejectValue: string }
>("review/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axios.put<{ success: boolean; data: IReview }>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/review/${id}`,
      data,
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to update review"
    );
  }
});

/* ---------------- DELETE REVIEW ---------------- */
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
