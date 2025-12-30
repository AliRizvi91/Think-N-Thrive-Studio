import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { toast } from "sonner";

export interface IContact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

// ---- getAllContacts ----
export const getAllContacts = createAsyncThunk<
  IContact[],
  void,
  { state: RootState; rejectValue: string }
>("contact/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<{ success: boolean; data: IContact[] }>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/contact`
    );
    return Array.isArray(response.data.data) ? response.data.data : [];
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch contacts");
  }
});

// ---- getContactById ----
export const getContactById = createAsyncThunk<
  IContact,
  string,
  { state: RootState; rejectValue: string }
>("contact/getById", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get<{ success: boolean; data: IContact }>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/contact/${id}`
    );
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch contact");
  }
});

// ---- postContact ----
export const postContact = createAsyncThunk<
  IContact,
  { name: string; email: string; phone?: string; message: string },
  { rejectValue: string }
>("contact/post", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post<{ success: boolean; data: IContact }>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/contact`,
      data,
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.status === 201) {
      toast.success("Thanks for getting in touch!");
    }

    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to create contact");
  }
});

// ---- updateContact ----
export const updateContact = createAsyncThunk<
  IContact,
  { id: string; data: Partial<IContact> },
  { state: RootState; rejectValue: string }
>("contact/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axios.put<{ success: boolean; data: IContact }>(
      `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/contact/${id}`,
      data,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to update contact");
  }
});

// ---- deleteContact ----
export const deleteContact = createAsyncThunk<
  string,
  string,
  { state: RootState; rejectValue: string }
>("contact/delete", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/api/studio/contact/${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to delete contact");
  }
});
