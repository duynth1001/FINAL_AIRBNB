import { createSlice } from "@reduxjs/toolkit";
import { getCommentByRoomID } from "../../apis/roomDetailAPI";

const initialState = {
  roomCmtList: [],
  showingCmtList:[],
};


const RoomCmtSlice = createSlice({
  name: "RoomComment",
  initialState,
  reducers: {
    getMoreCmtList:(state)=>{
        if (state.showingCmtList.length<state.roomCmtList.length) {
          state.showingCmtList.push(state.roomCmtList[state.showingCmtList.length])
        }
    },
    getNewCmtList :(state,{payload})=>{
      state.showingCmtList.push(payload)
    }
  },

extraReducers: (builder) => {
    builder.addCase(getCommentByRoomID.fulfilled,(state,{payload})=>{
      state.roomCmtList=payload
        if (state.roomCmtList.length>=2) {
          state.showingCmtList=state.roomCmtList.slice(0,2)
        }
        else{
            state.showingCmtList=payload
        }
    })
    
  },
});

export const { reducer: RoomCommentReducer } = RoomCmtSlice;
export const {getMoreCmtList,getNewCmtList} = RoomCmtSlice.actions