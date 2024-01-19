import { createSlice } from "@reduxjs/toolkit";
import { adminGetLocationInfo, adminGetLocationPerPage } from "../../apis/adminManageLocation";

const initialState = {
  locationList: [],
  locationSearchData:{},
  
};
const LocationManageSlice = createSlice({
  name: "locationmanage",
  initialState,
  reducers: {
      setLocationSearchDataEmpty : (state)=>{
        state.locationSearchData={}
      }
  },
  extraReducers: (builder) => {
    builder.addCase(adminGetLocationPerPage.fulfilled, (state, { payload }) => {
        state.locationList = payload.data;
      });
      builder.addCase(adminGetLocationInfo.fulfilled, (state, { payload }) => {
        state.locationSearchData = payload;
      });  
      builder.addCase(adminGetLocationInfo.rejected, (state ) => {
        state.locationSearchData = {};
      });  
  },
});
export const { reducer: LocationManageReducer } = LocationManageSlice;
export const {setLocationSearchDataEmpty} = LocationManageSlice.actions