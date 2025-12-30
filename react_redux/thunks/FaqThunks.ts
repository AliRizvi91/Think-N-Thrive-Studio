import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export interface IFaq {
  _id: string;
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
}

// ---- getAllFaqs ----
export const getAllFaqs = createAsyncThunk<
  IFaq[],
  void,
  { state: RootState; rejectValue: string }
>("faq/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<{ success: boolean; data: IFaq[] }>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/faqs`
    );
    return response.data.data; // <-- extract the array
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch FAQs");
  }
});

// ---- getFaqById ----
export const getFaqById = createAsyncThunk<
  IFaq,
  string,
  { state: RootState; rejectValue: string }
>("faq/getById", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get<{ success: boolean; data: IFaq }>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/faqs/${id}`
    );
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch FAQ");
  }
});

// ---- postFaq ----
export const postFaq = createAsyncThunk<
  IFaq,
  { question: string; answer: string },
  { state: RootState; rejectValue: string }
>("faq/post", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post<{ success: boolean; data: IFaq }>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/faqs`,
      data,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to create FAQ");
  }
});

// ---- updateFaq ----
export const updateFaq = createAsyncThunk<
  IFaq,
  { id: string; data: Partial<IFaq> },
  { state: RootState; rejectValue: string }
>("faq/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axios.put<{ success: boolean; data: IFaq }>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/faqs/${id}`,
      data,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to update FAQ");
  }
});

// ---- deleteFaq ----
export const deleteFaq = createAsyncThunk<
  string,
  string,
  { state: RootState; rejectValue: string }
>("faq/delete", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/faqs/${id}`);
    return id; // return deleted id
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to delete FAQ");
  }
});
