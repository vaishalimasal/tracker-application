import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./slices/projectSlice";
import issueReducer from "./slices/issueSlice";

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    issues: issueReducer,
  },
});

export default store;
