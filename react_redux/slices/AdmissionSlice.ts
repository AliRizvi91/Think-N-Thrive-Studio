import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { 
  IAdmission, 
  getAllAdmissions, 
  getAdmissionById, 
  postAdmission, 
  updateAdmission, 
  deleteAdmission 
} from "../thunks/AdmissionThunks";
interface AdmissionState {
  allAdmissions: IAdmission[];
  currentAdmission: IAdmission | null;
  loading: boolean;
  error: string | null;
}

const initialState: AdmissionState = {
  allAdmissions: [],
  currentAdmission: null,
  loading: false,
  error: null,
};

const AdmissionSlice = createSlice({
  name: "Admission",
  initialState,
  reducers: {
    clearCurrentAdmission: (state) => {
      state.currentAdmission = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllAdmissions
      .addCase(getAllAdmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAdmissions.fulfilled, (state, action: PayloadAction<IAdmission[]>) => {
        state.loading = false;
        console.log("Adminssion Slice" , action.payload);
        
        state.allAdmissions = action.payload;
      })
      .addCase(getAllAdmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to fetch Admissions";
      })
      // getAdmissionById
      .addCase(getAdmissionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdmissionById.fulfilled, (state, action: PayloadAction<IAdmission>) => {
        state.loading = false;
        state.currentAdmission = action.payload;
      })
      .addCase(getAdmissionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to fetch Admission";
      })
      // postAdmission
      .addCase(postAdmission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postAdmission.fulfilled, (state, action: PayloadAction<IAdmission>) => {
        state.loading = false;
        state.allAdmissions.unshift(action.payload);
      })
      .addCase(postAdmission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to create Admission";
      })
      // updateAdmission
      .addCase(updateAdmission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdmission.fulfilled, (state, action: PayloadAction<IAdmission>) => {
        state.loading = false;
        state.allAdmissions = state.allAdmissions.map((c) =>
          c._id === action.payload._id ? action.payload : c
        );
      })
      .addCase(updateAdmission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to update Admission";
      })
      // deleteAdmission
      .addCase(deleteAdmission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAdmission.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.allAdmissions = state.allAdmissions.filter((c) => c._id !== action.payload);
      })
      .addCase(deleteAdmission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to delete Admission";
      });
  },
});

export const { clearCurrentAdmission } = AdmissionSlice.actions;
export default AdmissionSlice.reducer;
