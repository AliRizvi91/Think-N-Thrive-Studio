import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export interface ICourse {
  _id: string;
  image: string; // ✅ backend se URL / filename
  title: string;
  description: string;
  category: string;
  duration: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseFormData {
  image: File | null; // ✅ sirf form ke liye
  title: string;
  description: string;
  category: string;
  duration: string;
  author: string;
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
  CourseFormData,
  { rejectValue: string }
>("course/post", async (form, { rejectWithValue }) => {
  try {
    const data = new FormData();

    data.append("title", form.title);
    data.append("description", form.description);
    data.append("category", form.category);
    data.append("duration", form.duration);
    data.append("author", form.author);

    if (form.image) {
      data.append("image", form.image);
    }


    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/course`,
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return response.data.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to create course"
    );
  }
});



// ---- updateCourse ----
export const updateCourse = createAsyncThunk<
  ICourse,
  { id: string; data: CourseFormData },
  { rejectValue: string }
>("course/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("duration", data.duration);
    formData.append("author", data.author);

    if (data.image) {
      formData.append("image", data.image);
    }

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/course/${id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return response.data.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to update course"
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
