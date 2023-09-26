import { createSlice } from "@reduxjs/toolkit";

const issueSlice = createSlice({
  name: "issues",
  initialState: {
    allIssues: [],
  },
  reducers: {
    setIssues: (state, action) => {
      state.allIssues = action.payload;
    },
  },
});

export const { setIssues } = issueSlice.actions;
export const getAllIssue = (state) => state.issues.allIssues;

export default issueSlice.reducer;
