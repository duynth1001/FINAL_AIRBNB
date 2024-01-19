import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import CommentSection from "./CommentSection/CommentSection";
const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const RoomDetailComment = ({ dataBinhLuan }) => {
    return (
    <div>
      <Grid
        container
      >
        {dataBinhLuan?.map((it) => (
          <Grid item  md={6} key={it.id}>
            <Item>
              <CommentSection tenNguoiCmt = {it.tenNguoiBinhLuan} ngayCmt = {it.ngayBinhLuan} noiDungCmt = {it.noiDung} danhGia ={it.saoBinhLuan} hinhAvatar = {it.avatar}/>
            </Item>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RoomDetailComment;
