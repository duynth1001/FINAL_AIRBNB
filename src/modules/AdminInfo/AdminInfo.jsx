import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import { useAuth } from "../../UserContext/UserContext";
import { useQuery } from "@tanstack/react-query";
import UploadImage from "../../components/UploadImage/UploadImage";
import { getUserInfoAPI } from "../../apis/userAPI";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../routes/path";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function AdminInfo() {
  const { currentUser } = useAuth();
  const { data: dataUser = [], refetch } = useQuery({
    queryKey: ["getUserInfoAPI"],
    queryFn: () => getUserInfoAPI(currentUser.user.id),
  });
  const navigate = useNavigate();
  return (
    <div>
        <AdminHeader/>
      <Grid container spacing={2}>
        <Grid item container xs={4}>
          <Item>
            <Box display="flex" flexDirection="column" alignItems="start">
              <Box sx={{ width: "100%" }}>
                <Stack alignItems="center">
                  <Avatar
                    sx={{ width: 100, height: 100 }}
                    src={dataUser.avatar}
                  />
                </Stack>
                <UploadImage refecthAvatar={refetch} />
              </Box>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item>
            <Box display="flex" flexDirection="column" alignItems="start">
              <Typography sx={{ fontWeight: 700, fontSize: 30 }}>
                Xin chào {dataUser.name}
              </Typography>

              <Button
                sx={{ textDecoration: "underline", color: "black" }}
                onClick={() => {
                  navigate(PATH.ADMIN_INFO_EDIT);
                }}
              >
                Chỉnh sửa hồ sơ
              </Button>
              <br />
              <Typography sx={{ fontSize: 25 }}>
                Thông tin quản trị viên
              </Typography>
              <br />
              <Typography>Mã quản trị : {dataUser.id}</Typography>
              <br />
              <Typography>Địa chỉ email : {dataUser.email}</Typography>
              <br />
              <Typography>Số diện thoại : {dataUser.phone}</Typography>
              <br />
              <Typography>Ngày sinh : {dataUser.birthday}</Typography>
              <br />
              <Typography>
                Giới tính : {dataUser.gender ? "Nam" : "Nữ"}
              </Typography>
              <br />
            </Box>
          </Item>
        </Grid>
      </Grid>
    </div>
  );
}
