import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchServices = createAsyncThunk("services/fetchServices", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/services`
  );
  return response.data;
});

export const fetchServiceById = createAsyncThunk("services/fetchServiceById", async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/services/${id}`
  );
  return response.data;
});

const serviceSlice = createSlice({
  name: "services",
  initialState: {
    services: [],             // list of all services
    selectedService: null,    // service details
    status: "idle",           // loading for the list
    detailsStatus: "idle",    // loading for a single service
    error: null,

  },
  reducers: {
    resetService: (state) => {
      state.selectedService = null;
      state.detailsStatus = "idle";
        state.error = null;
    },
  },
  extraReducers: (builder) => {

    // ------------------
    // Fetch All Services
    // ------------------
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.services = action.payload.services;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })


      // ------------------
      // Fetch Service By ID
      // ------------------
      .addCase(fetchServiceById.pending, (state) => {
        state.detailsStatus = 'loading';
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.detailsStatus = 'succeeded';
        state.selectedService = action.payload.service;
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.detailsStatus = 'failed';
        state.error = action.error.message;
      });
    }
});

export const { resetService } = serviceSlice.actions;

export default serviceSlice.reducer;
