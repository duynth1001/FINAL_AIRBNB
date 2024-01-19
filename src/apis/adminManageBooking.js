import { createAsyncThunk } from "@reduxjs/toolkit";
import fetcher from "./fetecher";

export const adminGetBooking = createAsyncThunk(
  "bookingmanage/getBooking",
  async () => {
    try {
      const resp = await fetcher.get(`/dat-phong`);
      return resp.data.content;
    } catch (error) {
      console.log(error);
    }
  }
);
export const adminGetBookingByID = createAsyncThunk(
  "bookingmanage/getBookingByID",
  async (params) => {
    try {
      const resp = await fetcher.get(`/dat-phong/${params}`);
      return resp.data.content;
    } catch (error) {
      alert(error.response.data.message);
      throw error;
    }
  }
);
export const adminBookingDelete = createAsyncThunk ("bookingmanage/deleteBookingByID",
  async (params) => {
    try {
      const resp = await fetcher.delete(`/dat-phong/${params}`);
      if (resp.status==200) {
        alert(resp.data.message)
      }
    } catch (error) {
      alert(error.response.data.message);
      throw error;
    }
  }
)
export const adminGetBookingInfo_querry = 
 async (params) => {
  try {
    const resp = await fetcher.get(`/dat-phong/${params}`);
    return resp.data.content;
  } catch (error) {
    alert(error.response.data.content);
    throw(error)
  }
};
export const adminBookingUpdateAPI = async(data) =>{
  try {
    const response = await fetcher.put(`/dat-phong/${data.params}`, data.payload);
    return response.data.content;
  } catch (error) {
      throw(error)
  }
}
export const adminBookingAddAPI = async(data) =>{
  try {
    const response = await fetcher.post(`/dat-phong`, data);
    return response.data.content;
  } catch (error) {
      throw(error)
  }
}

