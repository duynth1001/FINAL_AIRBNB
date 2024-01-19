import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Pagination, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getLocationPerPageAPI } from "../../../apis/homePageAPI";
import { useSearchParams } from "react-router-dom";
import HomePageCard from "../../../components/HomePageCard/HomePageCard";

const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function NearBy() {
  const { locationList } = useSelector((state) => state.location);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const handlePagination = (evt, page) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };
  useEffect(() => {
    dispatch(getLocationPerPageAPI({ page: searchParams.get("page") }));
  }, [searchParams]);
  return (

   <Box sx={{ flexGrow: 1,bgcolor:'#F2E5D3' }}>
      <Typography textAlign="center" sx={{ fontWeight: 700, fontSize: 23,mb:5 }}>
        Khám phá những điểm đến gần đây
      </Typography>
      <div id="TraiNghiem">
      <Grid container spacing={2}>
        {locationList?.map((it) => (
          <Grid xs={3} item key={it.id}>
              <Item>
                <HomePageCard maViTri={it.id} location = {it.tenViTri} city = {it.tinhThanh} country ={it.quocGia} imgSrc = {it.hinhAnh}/>
              </Item>

          </Grid>
        ))}
      </Grid>
      </div>
      <Grid container justifyContent="center" sx={{mt:5}}>
        <Pagination
          count={10}
          size="large"
          onChange={(evt, page) => {
            handlePagination(evt, page);
          }}
        />
      </Grid>
    </Box>
   
  );
}
