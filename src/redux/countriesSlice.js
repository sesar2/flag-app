import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFlags = createAsyncThunk("browse/fetchFlags", async () => {
    const response = await fetch("https://restcountries.com/v3.1/all?fields=name,region,flags,currencies,languages,population,capital");
    const data = await response.json();
    return data.map(flag => ({
      name: flag.name.common,
      region: flag.region,
      flagUrl: flag.flags.png,
      currencies: flag.currencies,
      languages: flag.languages,
      population: flag.population,
      capital: flag.capital 
    }));
  });


const countriesSlice = createSlice({
    name: 'countriesSlice',
    initialState:{
        allCountries: [],
        status: "idle",
        error: null
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
          .addCase(fetchFlags.pending, state => {
            state.status = "loading";
          })
          .addCase(fetchFlags.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.allCountries = action.payload;
          })
          .addCase(fetchFlags.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          });
      }
})

export default countriesSlice.reducer