import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FiltersState = {
  [category: string]: (string | number)[];
};

const initialState: FiltersState = {};

export const jobOfferFilters = createSlice({
  name: "filters",
  initialState,
  reducers: {
    reset: () => initialState,
    setFilter: (
      state,
      action: PayloadAction<{
        category: string;
        value: string | [number, number];
      }>,
    ) => {
      const { category, value } = action.payload;
      if (typeof value === "string") {
        const index = state[category]?.indexOf(value);
        if (index === -1 || index === undefined) {
          if (!state[category]) {
            state[category] = [value];
          } else {
            state[category].push(value);
          }
        } else {
          state[category].splice(index, 1);
          if (state[category].length === 0) {
            delete state[category];
          }
        }
      }

      if (
        Array.isArray(value) &&
        value.length === 2 &&
        typeof value[0] === "number" &&
        typeof value[1] === "number"
      ) {
        state[category] = value;
      }
    },
  },
});

export const { setFilter, reset } = jobOfferFilters.actions;

export default jobOfferFilters.reducer;
