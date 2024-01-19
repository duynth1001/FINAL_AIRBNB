import { createSlice } from "@reduxjs/toolkit";
import { adminGetUserInfo, adminGetUserPerPage } from "../../apis/adminManageUser";

const initialState = {
  userList: [],
  userSearchData:{},
  
};
const UserManageSlice = createSlice({
  name: "usermanage",
  initialState,
  reducers: {
      setUserSearchDataEmpty : (state)=>{
        state.userSearchData={}
      }
  },
  extraReducers: (builder) => {
    builder.addCase(adminGetUserPerPage.fulfilled, (state, { payload }) => {
        state.userList = payload.data;
      });
      builder.addCase(adminGetUserInfo.fulfilled, (state, { payload }) => {
        state.userSearchData = payload;
      });  
      builder.addCase(adminGetUserInfo.rejected, (state ) => {
        state.userSearchData = {};
      });  
  },
});
export const { reducer: userManageReducer } = UserManageSlice;
export const {setUserSearchDataEmpty} = UserManageSlice.actions