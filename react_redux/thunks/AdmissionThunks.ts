import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { toast } from "sonner";
import { log } from "console";


export interface IAdmission {
  _id: string;
  name: string;
  whatsappNumber: string;
  selectedCourses: string[];
  educationLevel: string;
  age: string;
  referralSource?: string;
  createdAt: string;
  updatedAt: string;
}

// ---- getAllAdmissions ----
export const getAllAdmissions = createAsyncThunk<
  IAdmission[],
  void,
  { state: RootState; rejectValue: string }
>("Admission/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<IAdmission[]>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/admission`
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch Admissions");
  }
});

// ---- getAdmissionById ----
export const getAdmissionById = createAsyncThunk<
  IAdmission,
  string,
  { state: RootState; rejectValue: string }
>("Admission/getById", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get<IAdmission>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/admission/${id}`
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch Admission");
  }
});

// ---- postAdmission ----

export const postAdmission = createAsyncThunk<
  IAdmission,
  {
    name: string;
    whatsappNumber: string;
    selectedCourses: string[];
    educationLevel: string;
    age: string;
    referralSource?: string;
  },
  { rejectValue: string }
>("Admission/post", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post<IAdmission>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/admission`,
      data,
      { headers: { "Content-Type": "application/json" } }
    );
    toast.success("Admission created successfully!");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to create Admission"
    );
  }
});

// ---- updateAdmission ----
export const updateAdmission = createAsyncThunk<
  IAdmission,
  { id: string; data: Partial<IAdmission> },
  { state: RootState; rejectValue: string }
>("Admission/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axios.put<IAdmission>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/admission/${id}`,
      data,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to update Admission");
  }
});

// ---- deleteAdmission ----
export const deleteAdmission = createAsyncThunk<
  string,
  string,
  { state: RootState; rejectValue: string }
>("Admission/delete", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/admission/${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to delete Admission");
  }
});
