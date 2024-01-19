import { createSlice } from "@reduxjs/toolkit";
import { adminGetBooking, adminGetBookingByID } from "../../apis/adminManageBooking";

const initialState = {
  bookingList: [],
  bookingSearchData:{},
  showingBookingList:[],
};
const BookingManageSlice = createSlice({
  name: "bookingmanage",
  initialState,
  reducers: {
      getMoreBookingList:(state)=>{
        if (state.showingBookingList.length<state.bookingList.length-5) {
          const showingListLength = state.showingBookingList.length
          const concatArr = state.bookingList.slice(showingListLength,showingListLength+5)
          state.showingBookingList= state.showingBookingList.concat(concatArr)
        }
        else if (state.showingBookingList.length<state.bookingList.length) {
         state.showingBookingList.push(state.bookingList[state.showingBookingList.length]) 
        }
      },
      setBookingSearchDataEmpty:(state)=>{
          state.bookingSearchData={}
      }

  },
  extraReducers: (builder) => {
      builder.addCase(adminGetBooking.fulfilled, (state, { payload }) => {
        state.bookingList = payload;
        if (payload?.length>=6) {
          state.showingBookingList=state.bookingList.slice(0,5)
        }
        else
        state.showingBookingList=payload
      });
      builder.addCase(adminGetBookingByID.fulfilled,(state,{payload})=>{
        state.bookingSearchData=payload
      })
      builder.addCase(adminGetBookingByID.rejected,(state,{payload})=>{
        state.bookingSearchData={}
      })
  },
});
export const { reducer: bookingManageReducer } = BookingManageSlice;
export const {getMoreBookingList,setBookingSearchDataEmpty} = BookingManageSlice.actions