import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IReview } from "../thunks/ReviewThunks";
import { 
  getAllReviews, 
  getReviewsByCourse, 
  postReview, 
  updateReview, 
  deleteReview 
} from "../thunks/ReviewThunks";

interface ReviewState {
  allReviews: IReview[];
  courseReviews: IReview[];
  currentReview: IReview | null;
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  allReviews: [],
  courseReviews: [],
  currentReview: null,
  loading: false,
  error: null,
};

const ReviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    clearCurrentReview: (state) => {
      state.currentReview = null;
    },
    clearCourseReviews: (state) => {
      state.courseReviews = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // ---- getAllReviews ----
      .addCase(getAllReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReviews.fulfilled, (state, action: PayloadAction<IReview[]>) => {
        state.loading = false;
        state.allReviews = action.payload;
      })
      .addCase(getAllReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch reviews";
      })

      // ---- getReviewsByCourse ----
      .addCase(getReviewsByCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReviewsByCourse.fulfilled, (state, action: PayloadAction<IReview[]>) => {
        state.loading = false;
        state.courseReviews = action.payload;
      })
      .addCase(getReviewsByCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch course reviews";
      })

      // ---- postReview ----
      .addCase(postReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postReview.fulfilled, (state, action: PayloadAction<IReview>) => {
        state.loading = false;
        state.allReviews.unshift(action.payload);
        state.courseReviews.unshift(action.payload);
      })
      .addCase(postReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create review";
      })

      // ---- updateReview ----
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReview.fulfilled, (state, action: PayloadAction<IReview>) => {
        state.loading = false;
        state.allReviews = state.allReviews.map((r) =>
          r._id === action.payload._id ? action.payload : r
        );
        state.courseReviews = state.courseReviews.map((r) =>
          r._id === action.payload._id ? action.payload : r
        );
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update review";
      })

      // ---- deleteReview ----
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.allReviews = state.allReviews.filter((r) => r._id !== action.payload);
        state.courseReviews = state.courseReviews.filter((r) => r._id !== action.payload);
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete review";
      });
  },
});

export const { clearCurrentReview, clearCourseReviews } = ReviewSlice.actions;
export default ReviewSlice.reducer;
