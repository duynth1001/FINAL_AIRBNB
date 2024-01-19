import React from 'react'
import AdminHeader from '../../../components/AdminHeader/AdminHeader'
import { Box, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { adminGetBookingInfo_querry } from '../../../apis/adminManageBooking'
import dayjs from 'dayjs'



const BookingDetailAdmin = () => {
    const [searchParams] = useSearchParams();
    const bookingID = searchParams.get('maDatPhong')
    const {data:bookingData =[]} = useQuery({
        queryKey: ["adminGetRoomInfo"],
        queryFn: () => adminGetBookingInfo_querry(bookingID),
    })
    return (
    <div>
        <AdminHeader/>
     <Box>
        <Typography sx={{textAlign:'center',mt:5,fontSize:20,fontWeight:700}}>Thông tin chi tiết đặt phòng </Typography>
        <Typography sx={{textAlign:'center',mt:5}}>Mã đặt phòng: {bookingData.id} </Typography>
        <Typography sx={{textAlign:'center',mt:5}}>Mã  phòng: {bookingData.maPhong} </Typography>
        <Typography sx={{textAlign:'center',mt:5}}>Ngày đến: { dayjs(bookingData.ngayDen).format('DD/MM/YYYY') } </Typography>
        <Typography sx={{textAlign:'center',mt:5}}>Ngày đi: {dayjs(bookingData.ngayDi).format('DD/MM/YYYY')} </Typography>
        
        <Typography sx={{textAlign:'center',mt:5}}>Số lượng khách: {bookingData.soLuongKhach} </Typography>
        <Typography sx={{textAlign:'center',mt:5}}>Mã người dùng: {bookingData.maNguoiDung} </Typography>
      </Box>
    </div>
  )
}

export default BookingDetailAdmin
