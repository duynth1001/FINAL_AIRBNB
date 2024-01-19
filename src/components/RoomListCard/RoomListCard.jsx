import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { PATH } from "../../routes/path";

export default function RoomListCard({
  maPhong,
  tenPhong,
  moTa,
  giaTien,
  hinhAnh,
})
{
  const navigate =useNavigate()
  return (
    <div>
    <Card sx={{ display: "inline-flex" }}>
      <CardMedia component="img" sx={{ width: 400 }} image={hinhAnh} />
      <CardContent >
        <Typography variant="h5" color="text.secondary">
          {tenPhong}{" "}
        </Typography>

        <Typography>{moTa}</Typography>
        <br />
        <Typography sx={{ fontWeight: 700 }}>
          Giá thuê: {giaTien}$/tháng
        </Typography>

        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" sx={{ color: "#F2E5D3", bgcolor: "#864622" }} 
          onClick={()=>{
            navigate({
              pathname: `${PATH.ROOM_DETAIL}`,
              search: `?maPhong=${maPhong}`,
            });
          }}
          >
            Tìm hiểu ngay!
          </Button>
        </CardActions>
      </CardContent>
    </Card>
    <Outlet/>
    </div>
  );
}
