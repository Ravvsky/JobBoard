import { configureStore } from "@reduxjs/toolkit";
import jobOfferFilters from "./features/jobOfferFilters";

export const store = configureStore({
  reducer: {
    jobOfferFilters,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
