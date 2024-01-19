import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getRoomByLocation } from "../../apis/roomDetailAPI";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import bannerImg from "../../assets/roomdetailbanner.jpg";
import { Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import RoomDetailBtn from "../../components/RoomDetailBtn/RoomDetailBtn";
import RoomListCard from "../../components/RoomListCard/RoomListCard";
const theme = createTheme();
const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function RoomListPage() {
  const [searchParams] = useSearchParams();
  const searchID = searchParams.get("id");
  const { data = [] } = useQuery({
    queryKey: ["getRoomByLocation"],
    queryFn: () => getRoomByLocation(searchID),
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={4}
          sx={{
            backgroundImage: `url(${bannerImg})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={8} component={Paper} elevation={6} square>
          <Typography
            sx={{ fontSize: 30, fontWeight: 700, textAlign: "center", mt: 2 }}
          >
            Chỗ ở tại khu vực bản đồ đã chọn
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Item>
              <RoomDetailBtn props={"Loại nơi ở"} />
            </Item>
            <Item>
              <RoomDetailBtn props={"Giá"} />
            </Item>
            <Item>
              <RoomDetailBtn props={" Đặt ngay"} />
            </Item>
            <Item>
              <RoomDetailBtn props={" Phòng và phòng ngủ"} />
            </Item>
            <Item>
              <RoomDetailBtn props={" Bộ lọc khác"} />
            </Item>
          </Stack>
          <Grid container >
        {data?.map((it) => (
          <Grid item xs={2} sm={4}  md={12} key={it.id}>
            <Item>
              <RoomListCard maPhong={it.id} tenPhong={it.tenPhong} moTa = {it.moTa} giaTien = {it.giaTien} hinhAnh = {it.hinhAnh}/>
            </Item>
          </Grid>
        ))}
      </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
