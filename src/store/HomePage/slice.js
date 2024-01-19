import { createSlice } from "@reduxjs/toolkit";
import { getLocationPerPageAPI } from "../../apis/homePageAPI";

const initialState = {
  locationList: [],
  isLoading: false,
  userSearchData:{},

};
const LocationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setSearchData:(state,{payload})=>{
      state.userSearchData=payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getLocationPerPageAPI.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.locationList = payload.data;
      });
  },
});
export const { reducer: locationReducer } = LocationSlice;
export const {setSearchData} = LocationSlice.actions
