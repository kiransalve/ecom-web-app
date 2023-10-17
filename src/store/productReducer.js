import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    maxValue: 5000,
    selectedCat: ["All"],
    rating: 2,
    sortBy: "",
    searchValue: "",
  },
  reducers: {
    filterByPrice: (state, action) => {
      state.maxValue = action.payload;
    },
    filterByCategory: (state, action) => {
      const category = action.payload;
      const index = state.selectedCat.indexOf(category);
      if (index === -1) {
        state.selectedCat.push(category);
      } else {
        state.selectedCat.splice(index, 1);
      }
    },
    filterByRating: (state, action) => {
      state.rating = action.payload;
    },
    sortByPrice: (state, action) => {
      state.sortBy = action.payload;
    },
    clearAllFilter: (state, action) => {
      state.sortBy = action.payload;
      state.maxValue = 5000;
      state.selectedCat = ["All"];
      state.rating = 0;
      state.sortBy = "";
    },
    searchByValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const {
  filterByPrice,
  filterByCategory,
  filterByRating,
  sortByPrice,
  clearAllFilter,
  searchByValue,
} = productSlice.actions;

export default productSlice.reducer;
