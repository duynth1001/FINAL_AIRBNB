import { createAsyncThunk } from "@reduxjs/toolkit";
import fetcher from "./fetecher";

export const adminGetRoomPerPage = createAsyncThunk(
  "roommanage/getRoomPerPage",
  async (params) => {
    try {
      const resp = await fetcher.get(`/phong-thue/phan-trang-tim-kiem`, {
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
export const adminGetRoomInfo = createAsyncThunk(
    "roommanage/getRoomInfo",
    async (params) => {
      try {
        const resp = await fetcher.get(`/phong-thue/${params}`);
        return resp.data.content;
      } catch (error) {
        alert(error.response.data.message);
        throw error;
      }
    }
  );
  export const adminDeleteRoomInfo = createAsyncThunk(
    "roommanage/delete",
    async (params) => {
      try {
        const resp = await fetcher.delete(`/phong-thue/${params}`);
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
  export const adminGetRoomInfo_querry = 
  async (params) => {
   try {
     const resp = await fetcher.get(`/phong-thue/${params}`);
     return resp.data.content;
   } catch (error) {
     alert(error.response.data.content);
     throw(error)
   }
 };  
 export const adminRoomUpdateAPI = async(data) =>{
  try {
    const response = await fetcher.put(`/phong-thue/${data.params}`, data.payload);
    return response.data.content;
  } catch (error) {
      throw(error)
  }
}
export const adminRoomAddAPI = async(payload) =>{
  try {
    const response = await fetcher.post(`/phong-thue`, payload);
    return response.data.content;
  } catch (error) {
      throw(error)
  }
}