import { createAsyncThunk } from "@reduxjs/toolkit";
import fetcher from "./fetecher";

export const getLocationPerPageAPI = createAsyncThunk(
  "ViTri/PhanTrangTimKiem",
  async (params) => {
    try {
      const resp = await fetcher.get("/vi-tri/phan-trang-tim-kiem", 
      {
        params: {
          pageIndex: params.page || 1,
          pageSize: 8,
        },
      });
      return resp.data.content;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getLocationAPI = async () =>{
  try {
    const resp = await fetcher.get('/vi-tri')
    return resp.data.content;
  } catch (error) {
    console.log(error);
  }
}
