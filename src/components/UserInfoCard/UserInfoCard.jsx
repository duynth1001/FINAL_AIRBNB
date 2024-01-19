import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
export default function UserInfoCard({ dataPhongThue }) {
  return (
    <div>
      {dataPhongThue?.map((it) => (
        <Grid container spacing={2}>
          <Grid textAlign="left" item xs={12} sm container>
            <Grid item xs container direction="column">
              <Grid item >
              <Typography sx={{ fontSize: 15 }}>
                  Mã đặt phòng : {it.id}
                </Typography>
                <Typography sx={{ fontSize: 15 }}>
                  Ngày nhận phòng: {dayjs(it.ngayDen).format("DD/MM/YYYY")}
                </Typography>
                <Typography sx={{ fontSize: 15 }}>
                  Ngày trả phòng: {dayjs(it.ngayDi).format("DD/MM/YYYY")}
                </Typography>
                <Typography sx={{ fontSize: 15 }}>
                  Số khách lưu trú: {it.soLuongKhach}
                </Typography>
                <Typography sx={{ fontSize: 15 }}>
                  Mã phòng : {it.maPhong}
                </Typography>
                <hr />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </div>
  );
}
