import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://app.aktivedirectory.com/api"; // Define API base URL

// ✅ Fetch Events Thunk
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const tenantId = 1;
      const response = await axios.get(`${API_BASE_URL}/getevent/1?tenant_id=${tenantId}`);
      
      console.log("API Response:", response.data); // ✅ Debug API response

      return response.data.details || []; // Ensure it returns an array
    } catch (error) {
      console.error("Fetch Events Error:", error);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch events.");
    }
  }
);

// ✅ Delete Event Thunk
export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      await axios.post(`${API_BASE_URL}/deleteevent`, { event_id: eventId });
      return eventId; // Return the ID to filter it out from state
    } catch (error) {
      console.error("Delete Event Error:", error);
      return rejectWithValue(error.response?.data?.message || "Failed to delete event.");
    }
  }
);

const eventSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    loading: false,
    error: null,
  },
  reducers: {}, // No regular reducers needed since we use thunks

  extraReducers: (builder) => {
    builder
      // ✅ Handle Fetch Events
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Handle Delete Event
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.filter((event) => event.event_id !== action.payload);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default eventSlice.reducer;
