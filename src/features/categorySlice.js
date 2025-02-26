import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch categories (prevents re-fetching if data exists)
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { getState, rejectWithValue }) => {
    const { categories } = getState().categories;
    if (categories.length > 0) return categories; // Prevent unnecessary API call

    try {
      const tenantId = 1;
      const response = await axios.get(`/api/getcategory/1?tenant_id=${tenantId}`);
      return response.data.details ?? [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to delete a category
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/deletecategory",
        { category_id: categoryId },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data.success) return categoryId;
      return rejectWithValue("Failed to delete category");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: { categories: [], loading: false, error: null },
  reducers: {
    clearCategories: (state) => {
      state.categories = []; // Optional: Clear categories when leaving the page
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        if (state.categories.length === 0) {
          state.loading = true; // Show loader only if no data is present
        }
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((cat) => cat.cat_id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearCategories } = categorySlice.actions;
export default categorySlice.reducer;
