import { Button, Grid } from "@mui/material";
import React, { useEffect } from "react";
import SearchBarAdmin from "../../../components/SearchBarAdmin/SearchBarAdmin";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import AdminTableDisplay from "../../../components/AdminTableDisplay/AdminTableDisplay";
import { useState } from "react";
import { validateAdminSearch } from "../../../helpers/helpers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../routes/path";
import { adminGetBooking, adminGetBookingByID } from "../../../apis/adminManageBooking";
import { getMoreBookingList, setBookingSearchDataEmpty } from "../../../store/BookingManage/slice";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const BookingManagePage = () => {
  const userPageFlag = 4;
  const { showingBookingList } = useSelector((state) => state.BookingManage);
  const dispatch = useDispatch();
  const handlePagination = () => {
    dispatch(getMoreBookingList())
  };
  const [searchQueryy, setSearchQuerry] = useState();
  const [onClickSearch, setOnClickSearch] = useState(-1);
  const { bookingSearchData } = useSelector((state) => state.BookingManage);
  const [flagTable,setFlagTable] = useState(0)
  const navigate = useNavigate()
  useEffect(() => {
    if (onClickSearch != -1) {
      dispatch(adminGetBookingByID(onClickSearch))
      setOnClickSearch(-1);
    }
    if (flagTable!=0) {
      setFlagTable(0)
    }
    dispatch(setBookingSearchDataEmpty())
    dispatch(adminGetBooking());
  }, [ onClickSearch,flagTable]);
  return (
    <div>
      <Button onClick={()=>{
        navigate(PATH.ADMIN_BOOKING_ADD)
      }} sx={{ textDecoration: "underline" ,color:'black' }}>Thêm thông tin đặt phòng</Button>
      <br />
      <Stack direction="row">
        <Item>
          <SearchBarAdmin
            setSearchStr={setSearchQuerry}
            holderText={"Nhập mã đặt phòng"}
          />
        </Item>
        <Item>
          <Button sx={{color:'black'}}
            onClick={() => {
              if (!validateAdminSearch(searchQueryy)) {
                return;
              }
              setOnClickSearch(searchQueryy);
            }}
          >
            Tìm
          </Button>
        </Item>
      </Stack>
      <br />

      <AdminTableDisplay
        dataUser={showingBookingList}
        searchData={bookingSearchData}
        flag={userPageFlag}
        thCol1={"Mã đặt phòng"}
        thCol2={"Mã phòng"}
        thCol3={"Số lượng khách"}
        thCol4={"Mã người dùng"}
        setFlagTable = {setFlagTable}
      />
      {Object.keys(bookingSearchData).length != 0 ? (
        <div></div>
      ) : (
        <div>
          {" "}
          <Grid container justifyContent="center" sx={{ mt: 5 }}>
           <Button sx={{color:'black',border:2}} onClick={handlePagination}>Xem thêm phòng</Button>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default BookingManagePage;
