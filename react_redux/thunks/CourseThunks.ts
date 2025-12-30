import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export interface ICourse {
  _id: string;
  image: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

// ---- getAllCourses ----
export const getAllCourses = createAsyncThunk<
  ICourse[],
  void,
  { state: RootState; rejectValue: string }
>("course/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<{ success: boolean; data: ICourse[] }>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/course`
    );

    return Array.isArray(response.data.data) ? response.data.data : [];
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch courses"
    );
  }
});

// ---- getCourseById ----
export const getCourseById = createAsyncThunk<
  ICourse,
  string,
  { state: RootState; rejectValue: string }
>("course/getById", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get<{ success: boolean; data: ICourse }>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/course/${id}`
    );

    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch course"
    );
  }
});

// ---- postCourse ----
export const postCourse = createAsyncThunk<
  ICourse,
  Omit<ICourse, "_id" | "createdAt" | "updatedAt">,
  { state: RootState; rejectValue: string }
>("course/post", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post<{ success: boolean; data: ICourse }>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/course`,
      data,
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to create course"
    );
  }
});

// ---- updateCourse ----
export const updateCourse = createAsyncThunk<
  ICourse,
  { id: string; data: Partial<ICourse> },
  { state: RootState; rejectValue: string }
>("course/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axios.put<{ success: boolean; data: ICourse }>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/course/${id}`,
      data,
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to update course"
    );
  }
});

// ---- deleteCourse ----
export const deleteCourse = createAsyncThunk<
  string,
  string,
  { state: RootState; rejectValue: string }
>("course/delete", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/course/${id}`
    );
    return id;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to delete course"
    );
  }
});
