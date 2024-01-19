import { createAsyncThunk } from "@reduxjs/toolkit";
import fetcher from "./fetecher";

export const adminGetLocationPerPage = createAsyncThunk(
  "locationmanage/getLocationPerPage",
  async (params) => {
    try {
      const resp = await fetcher.get(`/vi-tri/phan-trang-tim-kiem/`, {
        params: {
          pageIndex: params.page || 1,
          pageSize: 5,
        },
      });
      return resp.data.content;
    } catch (error) {
      console.log(error);
    }
  }
);
export const adminGetLocationInfo = createAsyncThunk(
  "locationmanage/getLocationInfo",
  async (params) => {
    try {
      const resp = await fetcher.get(`/vi-tri/${params}`);
      return resp.data.content;
    } catch (error) {
     alert(error.response.data.message)
      throw error;
    }
  }
);
export const adminDeleteLocationInfo = createAsyncThunk(
  "locationmanage/delete",
  async (params) => {
    try {
      const resp = await fetcher.delete(`/vi-tri/${params}`);
      if (resp.status == 200) {
        alert(resp.data.message);
      }
    } catch (error) {
    if(error.response.data.statusCode===403)
      {
        alert('Đây là trường gốc, vui lòng không xóa')
      }
    }
  }
);
export const adminGetLocationInfo_querry = 
 async (params) => {
  try {
    const resp = await fetcher.get(`/vi-tri/${params}`);
    return resp.data.content;
  } catch (error) {
    alert(error.response.data.content);
    throw(error)
  }
};
export const adminLocationUpdateAPI = async(data) =>{
    try {
      const response = await fetcher.put(`/vi-tri/${data.params}`, data.payload);
      return response.data.content;
    } catch (error) {
        throw(error)
    }
  }
  export const adminLocationAddAPI = async(payload) =>{
    try {
      const response = await fetcher.post(`/vi-tri`, payload);
      return response.data.content;
    } catch (error) {
        throw(error)
    }
  }