import React from "react";
import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import { Box, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import {
  adminGetLocationInfo_querry,
} from "../../../apis/adminManageLocation";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const LocationDetailAdmin = () => {
  const [searchParams] = useSearchParams();
  const locationID = searchParams.get("maViTri");
  const { data: locationData = [] } = useQuery({
    queryKey: ["adminGetLocationInfo"],
    queryFn: () => adminGetLocationInfo_querry(locationID),
  });
  return (
    <div>
      <AdminHeader />
      <Box>
        <Typography
          sx={{ textAlign: "center", mt: 5, fontSize: 20, fontWeight: 700 }}
        >
          Thông tin chi tiết vị trí{" "}
        </Typography>
        <Typography sx={{ textAlign: "center", mt: 5 }}>
          Mã vị trí: {locationData.id}
        </Typography>
        <Typography sx={{ textAlign: "center", mt: 5 }}>
          Tên vị trí: {locationData.tenViTri}
        </Typography>
        <Typography sx={{ textAlign: "center", mt: 5 }}>
          Tỉnh thành: {locationData.tinhThanh}
        </Typography>
        <Typography sx={{ textAlign: "center", mt: 5 }}>
          Quốc gia: {locationData.quocGia}
        </Typography>
        <Stack direction="row" sx={{ ml: 70, mt: 5 }}>
          <Item>
            {" "}
            <Typography sx={{ textAlign: "center" }}>Hình ảnh:</Typography>
          </Item>
          <Item>
            <Box
              component="img"
              sx={{ width: 180, height: 80 }}
              src={locationData.hinhAnh}
            />
          </Item>
        </Stack>
      </Box>
    </div>
  );
};

export default LocationDetailAdmin;
