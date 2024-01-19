import { createAsyncThunk } from "@reduxjs/toolkit";
import fetcher from "./fetecher";

export const getRoomByLocation = async (params) => {
  try {
    const resp = await fetcher.get("/phong-thue/lay-phong-theo-vi-tri", {
      params: {
        maViTri: params,
      },
    });
    return resp.data.content;
  } catch (error) {
    console.log(error);
  }
};

export const getRoomByID = async (params) => {
  try {
    const resp = await fetcher.get(`/phong-thue/${params}`);
    return resp.data.content;
  } catch (error) {
    console.log(error);
  }
};

export const getCommentByRoomID = createAsyncThunk(
  "room/getUserCmt",
  async (params) => {
    try {
      const resp = await fetcher.get(
        `/binh-luan/lay-binh-luan-theo-phong/${params}`
      );
      return resp.data.content;
    } catch (error) {
      console.log(error);
    }
  }
);

export const BookingRoomAPI = async (payload) => {
  try {
    const resp = await fetcher.post(`/dat-phong`, payload);
    return resp.data.content;
  } catch (error) {
    console.log(error);
  }
};

export const UserCommentAPI = async (payload) => {
  try {
    const resp = await fetcher.post(`/binh-luan`, payload);
    return resp.data.content;
  } catch (error) {
    console.log(error);
  }
};

export const getUserBookingAPI = async (params) => {
  try {
    const resp = await fetcher.get(`/dat-phong/lay-theo-nguoi-dung/${params}`);
    return resp.data.content;
  } catch (error) {
    console.log(error);
  }
};
