// slices/CourseSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllCourses,
  getCourseById,
  postCourse,
  updateCourse,
  deleteCourse,
} from "../thunks/CourseThunks";
import { ICourse } from "../thunks/CourseThunks";

interface CourseState {
  allCourses: ICourse[];
  currentCourse: ICourse | null;
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  allCourses: [],
  currentCourse: null,
  loading: false,
  error: null,
};

const CourseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    clearCurrentCourse(state) {
      state.currentCourse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ================= getAllCourses =================
      .addCase(getAllCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllCourses.fulfilled,
        (state, action: PayloadAction<ICourse[]>) => {
          state.loading = false;
          state.allCourses = action.payload;
        }
      )
      .addCase(getAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch courses";
      })

      // ================= getCourseById =================
      .addCase(getCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getCourseById.fulfilled,
        (state, action: PayloadAction<ICourse>) => {
          state.loading = false;
          state.currentCourse = action.payload;
        }
      )
      .addCase(getCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch course";
      })

      // ================= postCourse =================
      .addCase(postCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        postCourse.fulfilled,
        (state, action: PayloadAction<ICourse>) => {
          state.loading = false;
          state.allCourses.unshift(action.payload);
        }
      )
      .addCase(postCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to create course";
      })

      // ================= updateCourse =================
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateCourse.fulfilled,
        (state, action: PayloadAction<ICourse>) => {
          state.loading = false;
          const index = state.allCourses.findIndex(
            (c) => c._id === action.payload._id
          );
          if (index !== -1) {
            state.allCourses[index] = action.payload;
          }
        }
      )
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to update course";
      })

      // ================= deleteCourse =================
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteCourse.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.allCourses = state.allCourses.filter(
            (course) => course._id !== action.payload
          );
        }
      )
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to delete course";
      });
  },
});

export const { clearCurrentCourse } = CourseSlice.actions;
export default CourseSlice.reducer;
