import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFaq, getAllFaqs, getFaqById, postFaq, updateFaq, deleteFaq } from "../thunks/FaqThunks";

interface FaqState {
  allFaqs: IFaq[];
  currentFaq: IFaq | null;
  loading: boolean;
  error: string | null;
}

const initialState: FaqState = {
  allFaqs: [],
  currentFaq: null,
  loading: false,
  error: null,
};

const FaqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    clearCurrentFaq: (state) => {
      state.currentFaq = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ---- getAllFaqs ----
      .addCase(getAllFaqs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFaqs.fulfilled, (state, action: PayloadAction<IFaq[]>) => {
        state.loading = false;
        state.allFaqs = action.payload;
      })
      .addCase(getAllFaqs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch FAQs";
      })

      // ---- getFaqById ----
      .addCase(getFaqById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFaqById.fulfilled, (state, action: PayloadAction<IFaq>) => {
        state.loading = false;
        state.currentFaq = action.payload;
      })
      .addCase(getFaqById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch FAQ";
      })

      // ---- postFaq ----
      .addCase(postFaq.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postFaq.fulfilled, (state, action: PayloadAction<IFaq>) => {
        state.loading = false;
        state.allFaqs.unshift(action.payload);
      })
      .addCase(postFaq.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create FAQ";
      })

      // ---- updateFaq ----
      .addCase(updateFaq.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFaq.fulfilled, (state, action: PayloadAction<IFaq>) => {
        state.loading = false;
        state.allFaqs = state.allFaqs.map((faq) =>
          faq._id === action.payload._id ? action.payload : faq
        );
      })
      .addCase(updateFaq.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update FAQ";
      })

      // ---- deleteFaq ----
      .addCase(deleteFaq.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFaq.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.allFaqs = state.allFaqs.filter((faq) => faq._id !== action.payload);
      })
      .addCase(deleteFaq.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete FAQ";
      });
  },
});

export const { clearCurrentFaq } = FaqSlice.actions;
export default FaqSlice.reducer;
