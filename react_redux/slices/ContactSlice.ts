import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { 
  IContact, 
  getAllContacts, 
  getContactById, 
  postContact, 
  updateContact, 
  deleteContact 
} from "../thunks/ContactThunks";

interface ContactState {
  allContacts: IContact[];
  currentContact: IContact | null;
  loading: boolean;
  error: string | null;
}

const initialState: ContactState = {
  allContacts: [],
  currentContact: null,
  loading: false,
  error: null,
};

const ContactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    clearCurrentContact: (state) => {
      state.currentContact = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ---- getAllContacts ----
      .addCase(getAllContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllContacts.fulfilled, (state, action: PayloadAction<IContact[]>) => {
        state.loading = false;
        state.allContacts = action.payload;
      })
      .addCase(getAllContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to fetch contacts";
      })

      // ---- getContactById ----
      .addCase(getContactById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getContactById.fulfilled, (state, action: PayloadAction<IContact>) => {
        state.loading = false;
        state.currentContact = action.payload;
      })
      .addCase(getContactById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to fetch contact";
      })

      // ---- postContact ----
      .addCase(postContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postContact.fulfilled, (state, action: PayloadAction<IContact>) => {
        state.loading = false;
        state.allContacts.unshift(action.payload);
      })
      .addCase(postContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to create contact";
      })

      // ---- updateContact ----
      .addCase(updateContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContact.fulfilled, (state, action: PayloadAction<IContact>) => {
        state.loading = false;
        state.allContacts = state.allContacts.map((c) =>
          c._id === action.payload._id ? action.payload : c
        );
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to update contact";
      })

      // ---- deleteContact ----
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.allContacts = state.allContacts.filter((c) => c._id !== action.payload);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to delete contact";
      });
  },
});

export const { clearCurrentContact } = ContactSlice.actions;
export default ContactSlice.reducer;
