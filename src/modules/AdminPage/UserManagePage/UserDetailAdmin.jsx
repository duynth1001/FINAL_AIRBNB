import React from 'react'
import AdminHeader from '../../../components/AdminHeader/AdminHeader'
import { Box, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import {  adminGetUserInfo_querry } from '../../../apis/adminManageUser'
import { useQuery } from '@tanstack/react-query'
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const UserDetailAdmin = () => {
    const [searchParams] = useSearchParams();
    const userID = searchParams.get('maNguoiDung')
    const {data:userData =[]} = useQuery({
        queryKey: ["adminGetUserInfo"],
        queryFn: () => adminGetUserInfo_querry(userID),
    })
    return (
    <div>
        <AdminHeader/>
     <Box>
        <Typography sx={{textAlign:'center',mt:5,fontSize:20,fontWeight:700}}>Thông tin chi tiết người dùng </Typography>
        <Typography sx={{textAlign:'center',mt:5}}>Mã người dùng: {userData.id}</Typography>
        <Typography sx={{textAlign:'center',mt:5}}>Tên người dùng: {userData.name}</Typography>
        <Typography sx={{textAlign:'center',mt:5}}>Email người dùng: {userData.email}</Typography>
        <Typography sx={{textAlign:'center',mt:5}}>Số điện thoại người dùng: {userData.phone}</Typography>
        <Typography sx={{textAlign:'center',mt:5}}>Ngày sinh người dùng: {userData.birthday}</Typography>
        <Stack direction="row" sx={{ml:70,mt:5}}>
        <Item>  <Typography sx={{textAlign:'center'}}>Avatar người dùng:</Typography></Item>
        <Item>
        <Box
  component="img"
        sx={{width:180,height:80}}
  src={userData.avatar}
/>
        </Item>
      </Stack>
      <Typography sx={{textAlign:'center',mt:5}}>Giới tính người dùng: {userData.gender?'Nam' :'Nữ'}</Typography>
      <Typography sx={{textAlign:'center',mt:5}}>Ngày sinh người dùng: {userData.birthday}</Typography>
      <Typography sx={{textAlign:'center',mt:5}}>Loại người dùng: {userData.role}</Typography>
    <br /><br /><br />
      </Box>
    </div>
  )
}

export default UserDetailAdmin
