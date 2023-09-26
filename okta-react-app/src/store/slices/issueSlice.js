import { createSlice } from '@reduxjs/toolkit';

const issueSlice = createSlice({
  name: 'issues',
  initialState: [],
  reducers: {
    setIssues: (state, action) => {
      return action.payload;
    },
   
  },
});

export const { setIssues } = issueSlice.actions;
export default issueSlice.reducer;