import { createAsyncThunk } from "@reduxjs/toolkit";
import fetcher from "./fetecher";

export const adminGetUserPerPage = createAsyncThunk('usermanage/getUserPerPage', 
async (params) => {
  try {
    const resp = await fetcher.get(`/users/phan-trang-tim-kiem/`, {
      params: {
        pageIndex: params.page || 1,
        pageSize: 5,
      },
    });
    return resp.data.content;
  } catch (error) {
    console.log(error);
  }
});

export const adminGetUserInfo = createAsyncThunk('usermanage/getUserInfo',
 async (params) => {
  try {
    const resp = await fetcher.get(`/users/${params}`);
    return resp.data.content;
  } catch (error) {
    alert(error.response.data.content);
    throw(error)
  }
});
export const adminGetUserInfo_querry = 
 async (params) => {
  try {
    const resp = await fetcher.get(`/users/${params}`);
    return resp.data.content;
  } catch (error) {
    alert(error.response.data.content);
    throw(error)
  }
};
export const adminDeleteUserInfo = createAsyncThunk(
  'usermanage/delete',
 async (params) => {
  try {
    const resp = await fetcher.delete(`/users/`,{
      params:{
        id:params
      }
    });
    if (resp.status==200) {
      alert(resp.data.message)
    }
  } catch (error) {
    alert(error.response.data.message)
  }
});

export const createAdminAPI = async (payload) => {
  try {
    const response = await fetcher.post("/users", payload);
    return response.data.content;
  } catch (error) {
    throw(error)
  }
};
