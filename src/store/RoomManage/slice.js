import { createSlice } from "@reduxjs/toolkit";
import { adminGetRoomInfo, adminGetRoomPerPage } from "../../apis/adminManageRoom";

const initialState = {
  roomList: [],
  roomSearchData:{},
  
};
const RoomManageSlice = createSlice({
  name: "roommanage",
  initialState,
  reducers: {
      setRoomSearchDataEmpty : (state)=>{
        state.roomSearchData={}
      }
  },
  extraReducers: (builder) => {
    builder.addCase(adminGetRoomPerPage.fulfilled, (state, { payload }) => {
        state.roomList = payload.data;
      });
      builder.addCase(adminGetRoomInfo.fulfilled, (state, { payload }) => {
        state.roomSearchData = payload;
      });  
      builder.addCase(adminGetRoomInfo.rejected, (state ) => {
        state.roomSearchData = {};
      });  
  },
});
export const { reducer: roomManageReducer } = RoomManageSlice;
export const {setRoomSearchDataEmpty} = RoomManageSlice.actions