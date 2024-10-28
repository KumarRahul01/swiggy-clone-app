import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//? VARIOUS APIs:

// ? Swiggy API: https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.9690247&lng=72.8205292&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING

// ? https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING

// ? Swiggy API: https://instafood.onrender.com/api/restaurants?lat=${lat}&lng=${lng}

export const getAllData = createAsyncThunk(
  "getAllData",
  async ({ lat, lng }) => {
    const res = await fetch(
      // `https://instafood.onrender.com/api/restaurants?lat=${lat}&lng=${lng}`
      `https://food-delivery-cors.vercel.app/api/proxy/swiggy/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );

    const data = await res.json();

    if (data.data.cards[0].card.card.title === "Location Unserviceable") {
      console.log("Location Unserviceable");
      window.location.href = "/location-unservicable";
      return data;
    } else {
      return data;
    }
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    cartData: [],
    loading: false,
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(getAllData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getAllData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.data = [];
      });
  },
});

export default dataSlice.reducer;
