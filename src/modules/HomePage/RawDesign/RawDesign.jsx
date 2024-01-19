import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import homeImg from "../../../assets/home.jpg";
import homeBeachViewImg from "../../../assets/homebeachview.jpg";
import homeFarmImg from "../../../assets/homefarm.jpg";
import dogImg from "../../../assets/dog.jpg";
const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function RawDesign() {
  return (
    <div id="TraiNghiemTrucTuyen">
    <Box sx={{ flexGrow: 1,bgcolor:'#F2E5D3' }}>
      <br />
      <Typography textAlign='center' sx={{ fontWeight: 700, fontSize: 23 }}>
        Ở bất cứ đâu
      </Typography>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Item>
            <Box
              component="img"
              sx={{
                height: "30vh",
                width: "20vw",
              }}
              src={homeImg}
            ></Box>
            <Typography
              sx={{ textAlign: "left", fontWeight: 700, color: "black", pl: 2 }}
            >
              Toàn bộ nhà
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            {" "}
            <Box
              component="img"
              sx={{
                height: "30vh",
                width: "20vw",
              }}
              src={homeBeachViewImg}
            ></Box>
            <Typography
              sx={{ textAlign: "left", fontWeight: 700, color: "black", pl: 2 }}
            >
              Chỗ ở độc đáo
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            {" "}
            <Box
              component="img"
              sx={{
                height: "30vh",
                width: "20vw",
              }}
              src={homeFarmImg}
            ></Box>
            <Typography
              sx={{ textAlign: "left", fontWeight: 700, color: "black", pl: 2 }}
            >
              Trang trại và thiên nhiên
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            {" "}
            <Box
              component="img"
              sx={{
                height: "30vh",
                width: "20vw",
              }}
              src={dogImg}
            ></Box>
            <Typography
              sx={{ textAlign: "left", fontWeight: 700, color: "black", pl: 2 }}
            >
              Cho phép mang theo thú cưng
            </Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
    </div>
  );
}
