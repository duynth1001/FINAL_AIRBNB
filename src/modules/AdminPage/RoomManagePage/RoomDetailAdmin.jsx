import React from 'react'
import AdminHeader from '../../../components/AdminHeader/AdminHeader'
import { Box, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { adminGetRoomInfo_querry } from '../../../apis/adminManageRoom'
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const RoomDetailAdmin = () => {
    const [searchParams] = useSearchParams();
    const roomID = searchParams.get('maPhong')
    const {data:roomData =[]} = useQuery({
        queryKey: ["adminGetRoomInfo"],
        queryFn: () => adminGetRoomInfo_querry(roomID),
    })
    return (
    <div>
        <AdminHeader/>
     <Box>
        <Typography sx={{textAlign:'center',mt:5,fontSize:20,fontWeight:700}}>Thông tin chi tiết phòng </Typography>
        <Typography sx={{textAlign:'center',mt:5}}>Mã phòng: {roomData.id} </Typography>
        <Typography sx={{textAlign:'center',mt:5}}>Tên phòng: {roomData.tenPhong} </Typography>
        <Typography sx={{textAlign:'center',mt:5}}>Khách: {roomData.khach} </Typography>
        <Typography sx={{textAlign:'center',mt:5}}>Phòng ngủ: {roomData.phongNgu} </Typography>
        <Typography sx={{textAlign:'center',mt:5}}>Giường: {roomData.giuong} </Typography>
        <Typography sx={{textAlign:'center',mt:5}}>Phòng tắm: {roomData.phongTam} </Typography>
        <Typography sx={{textAlign:'center',mt:5}}>Mô tả: {roomData.moTa} </Typography>
        <Typography sx={{textAlign:'center',mt:5}}>Giá tiền: {roomData.giaTien} </Typography>
        <Typography sx={{textAlign:'center',mt:5}}>Máy giặt: {roomData.mayGiat?'Có':'Không'} </Typography>
        <Typography sx={{textAlign:'center',mt:5}}>Bàn là: {roomData.banLa?'Có':'Không'} </Typography>
        <Typography sx={{textAlign:'center',mt:5}}>Ti vi: {roomData.tivi?'Có':'Không'} </Typography>
        <Typography sx={{textAlign:'center',mt:5}}>Điều hòa: {roomData.dieuHoa?'Có':'Không'} </Typography>
        <Typography sx={{textAlign:'center',mt:5}}>Wifi: {roomData.wifi?'Có':'Không'} </Typography>
        <Typography sx={{textAlign:'center',mt:5}}>Bếp: {roomData.bep?'Có':'Không'} </Typography>
        <Typography sx={{textAlign:'center',mt:5}}>Đỗ xe: {roomData.doXe?'Có':'Không'} </Typography>
        <Typography sx={{textAlign:'center',mt:5}}>Hồ hơi: {roomData.hoBoi?'Có':'Không'} </Typography>
        <Typography sx={{textAlign:'center',mt:5}}>Bàn ủi: {roomData.banUi?'Có':'Không'} </Typography>
        <Typography sx={{textAlign:'center',mt:5}}>Mã vị trí: {roomData.maViTri} </Typography>
        <Stack direction="row" sx={{ ml: 70, mt: 5 }}>
          <Item>
            {" "}
            <Typography sx={{ textAlign: "center" }}>Hình ảnh:</Typography>
          </Item>
          <Item>
            <Box
              component="img"
              sx={{ width: 400, height: 200 }}
              src={roomData.hinhAnh}
            />
          </Item>
        </Stack>
      </Box>
    </div>
  )
}

export default RoomDetailAdmin
