import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    selectedProject :{},
    allProject :[],
    teamMembers : []
  },
  reducers: {
    setProjects: (state, action) => {
      state.allProject = action.payload;
    },
    setSelectProject:(state ,action) =>{
      state.selectedProject = action.payload
    },
    setTeamMembers:(state,action) =>{
      state.teamMembers = action.payload
    }
  },
});

export const { setProjects,setSelectProject,setTeamMembers } = projectSlice.actions;
export const getAllProject = (state) => state.projects
export default projectSlice.reducer;
