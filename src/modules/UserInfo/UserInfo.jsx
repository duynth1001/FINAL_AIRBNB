import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckIcon from "@mui/icons-material/Check";
import UserInfoCard from "../../components/UserInfoCard/UserInfoCard";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useAuth } from "../../UserContext/UserContext";
import { useQuery } from "@tanstack/react-query";
import { getUserBookingAPI } from "../../apis/roomDetailAPI";
import UploadImage from "../../components/UploadImage/UploadImage";
import { getUserInfoAPI } from "../../apis/userAPI";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../routes/path";
import { useEffect } from "react";
const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function UserInfo() {
  const { currentUser } = useAuth();
  const { data = [] } = useQuery({
    queryKey: ["getUserBookingAPI"],
    queryFn: ()=>getUserBookingAPI(currentUser.user.id),
  });
  const { data:dataUser = [],refetch } = useQuery({
    queryKey: ["getUserInfoAPI"],
    queryFn: ()=>getUserInfoAPI(currentUser.user.id),
  });
  const navigate = useNavigate()
  useEffect(()=>{
    if (!currentUser) {
      navigate(PATH.HOME_PAGE)
    }
  })
  return (
    <div>
      <Header/>
    <Grid container spacing={2}>
      <Grid item container xs={6}>
        <Item>
          <Box display="flex" flexDirection="column" alignItems="start">
            <Box sx={{ width: "100%" }}>
              <Stack alignItems="center">
                <Avatar sx={{ width: 100, height: 100 }} src={dataUser.avatar}/>
              </Stack>
            <UploadImage refecthAvatar = {refetch}/>
            </Box>
            <br />
            <CheckBoxIcon sx={{ width: 40, height: 40, color: "green" }} />
            <br />
            <Typography sx={{ fontWeight: 700, fontSize: 17 }}>
              Xác minh danh tính
            </Typography>
            <br />
            <Typography>
              Xác thực danh tính của bạn với huy hiệu xác minh danh tính
            </Typography>
            <br />
            <Typography>
              Người dùng xác thực danh tính sẽ được nhân viên hỗ trợ nhanh chóng hơn
            </Typography>
            <br />
            <Button sx={{ border: 2, color: "black" }}>Nhận huy hiệu</Button>
            <br />
            <Typography sx={{ fontWeight: 700, fontSize: 17 }}>
              {dataUser.name} đã xác nhận
            </Typography>
            <br />
            <Typography>
              <CheckIcon />
              Địa chỉ email : {dataUser.email}
            </Typography>
            <Typography>
              <CheckIcon />
              Số diện thoại : {dataUser.phone}
            </Typography>
            <Typography>
              <CheckIcon />
              Ngày sinh : {dataUser.birthday}
            </Typography>
            <Typography>
              <CheckIcon />
              Giới tính : {dataUser.gender?'Nam':'Nữ'}
            </Typography>
            
          </Box>
        </Item>
      </Grid>
      <Grid item xs={6}>
        <Item>
          <Box display="flex" flexDirection="column" alignItems="start">
            <Typography sx={{ fontWeight: 700, fontSize: 30 }}>
              Xin chào, tôi là  {dataUser.name}
            </Typography>
            <Typography>Bắt đầu tham gia vào 2021</Typography>
            <Button sx={{textDecoration:'underline',color:'black'}} onClick={()=>{
              navigate(PATH.USER_INFO_EDIT)
            }}>Chỉnh sửa hồ sơ</Button>
            <Typography sx={{ fontWeight: 700, fontSize: 25 }}>
             Phòng  {dataUser.name} đã đặt 
             <br />
            </Typography>
            <UserInfoCard dataPhongThue = {data} />
          </Box>
        </Item>
      </Grid>
    </Grid>
    <Footer/>
    </div>
  );
}
