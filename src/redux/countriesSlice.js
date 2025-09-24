import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFlags = createAsyncThunk("browse/fetchFlags", async () => {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,region,flags,currencies,languages,population,capital"
  );
  const data = await response.json();
  return data.map((flag) => ({
    name: flag.name.common,
    region: flag.region,
    flagUrl: flag.flags.png,
    currencies: flag.currencies,
    languages: flag.languages,
    population: flag.population,
    capital: flag.capital,
  }));
});

export const fetchSingleCountry = createAsyncThunk(
  "browse/fetchSingleCountry",
  async (countryName) => {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}?fields=name,region,flags,currencies,languages,population,capital`
    );
    const data = await response.json();
    return data.map((flag) => ({
      name: flag.name.common,
      region: flag.region,
      flagUrl: flag.flags.png,
      currencies: flag.currencies,
      languages: flag.languages,
      population: flag.population,
      capital: flag.capital,
    }));
  }
);

const countriesSlice = createSlice({
  name: "countriesSlice",
  initialState: {
    allCountries: [],
    singleCountry: {},
    collection: localStorage.getItem("collection") ? JSON.parse(localStorage.getItem("collection")) : [],
    status: "idle",
    error: null,
  },
  reducers: {
    addToCollection: (state, action) => {
      state.collection = [...state.collection, action.payload];
    },
    removeFromCollection : (state, action) => {
  state.collection = state.collection.filter(
    (c) => c.name !== action.payload
  );    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlags.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFlags.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allCountries = action.payload;
      })
      .addCase(fetchFlags.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSingleCountry.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleCountry.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleCountry = action.payload[0]; 
      })
      .addCase(fetchSingleCountry.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addToCollection, removeFromCollection } = countriesSlice.actions;
export default countriesSlice.reducer;
