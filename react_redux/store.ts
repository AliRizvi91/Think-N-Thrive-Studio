// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit'

import AdmissionReducer from './slices/AdmissionSlice'
import ContactReducer from './slices/ContactSlice'
import CourseReducer from './slices/CourseSlice'
import FaqReducer from './slices/FaqSlice'
import ReviewReducer from './slices/ReviewSlice'
import userReducer from './slices/UserSlice'

export const store = configureStore({
  reducer: {
    StoreOfAdmission: AdmissionReducer,
    StoreOfContact: ContactReducer,
    StoreOfCourse: CourseReducer,
    StoreOfFaqs: FaqReducer,
    StoreOfReview: ReviewReducer,
    StoreOfUser: userReducer,
  },
})

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>

// Export a type that can be used to dispatch actions
export type AppDispatch = typeof store.dispatch

// Export the store type for use with useStore hook
export type AppStore = typeof store