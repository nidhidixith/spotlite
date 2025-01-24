import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import instance from "../api";

const searchAdapter = createEntityAdapter();

// Define initial states
const initialState = {
  searches: searchAdapter.getInitialState({ loading: false, error: null }),
};

export const performSearch = createAsyncThunk(
  "searches/performSearch ",
  async ({ query }, { rejectWithValue }) => {
    const response = await instance.get(`/search_service/search/?q=${query}`);
    return response.data;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    resetSearches(state) {
      return initialState;
    },
    clearSearches: (state) => {
      searchAdapter.removeAll(state.searches);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(performSearch.pending, (state) => {
        state.searches.loading = true;
        state.searches.error = null;
      })
      .addCase(performSearch.fulfilled, (state, action) => {
        state.searches.loading = false;
        searchAdapter.setAll(state.searches, action.payload);
      })
      .addCase(performSearch.rejected, (state, action) => {
        state.searches.loading = false;
        state.searches.error = action.error.message;
      });
  },
});

export const { resetSearches, clearSearches } = searchSlice.actions;

export default searchSlice.reducer;

export const {
  selectAll: selectAllSearches,
  selectById: selectSearchById,
  selectIds: selectSearchIds,
} = searchAdapter.getSelectors((state) => state.search.searches);
