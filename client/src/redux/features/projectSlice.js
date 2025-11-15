import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProjects = createAsyncThunk("projects/fetchProjects", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/projects`
  );
  return response.data;
});

export const fetchProjectById = createAsyncThunk("projects/fetchProjectById", async (projectId) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/projects/${projectId}`
  );
  return response.data;
});

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    status: "idle",
    error: null,
    selectedProject: null,
    detailStatus: "idle",
  },
  reducers: {
    resetProject: (state) => {
      state.selectedProject = null;
      state.detailStatus = "idle";
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = action.payload.projects;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })



      .addCase(fetchProjectById.pending, (state) => {
        state.detailStatus = "loading";
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        state.selectedProject = action.payload.project;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export default projectSlice.reducer;
