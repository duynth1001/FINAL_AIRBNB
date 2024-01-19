import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BookingRoomAPI, getCommentByRoomID, getRoomByID } from "../../../apis/roomDetailAPI";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import IosShareIcon from "@mui/icons-material/IosShare";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import avatarImg from "../../../assets/avatar.png";
import RoofingIcon from "@mui/icons-material/Roofing";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import TranslateIcon from "@mui/icons-material/Translate";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import WifiIcon from "@mui/icons-material/Wifi";
import TvIcon from "@mui/icons-material/Tv";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import IronIcon from "@mui/icons-material/Iron";
import BathroomIcon from "@mui/icons-material/Bathroom";
import PoolIcon from "@mui/icons-material/Pool";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import CheckIcon from "@mui/icons-material/Check";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { numberOfVistor } from "./NumberOfVisitors";
import FlagIcon from "@mui/icons-material/Flag";
import RoomDetailComment from "./RoomDetailComment/RoomDetailComment";
import { useDispatch, useSelector } from "react-redux";
import { getMoreCmtList } from "../../../store/RoomComment/slice";
import UserComment from "../../../components/UserComment/UserComment";
import dayjs from "dayjs";
import {  dayStaysValidation, validateBookingData } from "../../../helpers/helpers";
import { useAuth } from "../../../UserContext/UserContext";
const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const RoomDetailPage = () => {
  const [searchParams] = useSearchParams();
  const searchID = searchParams.get("maPhong");
  const { data = [] } = useQuery({
    queryKey: ["getRoomByID"],
    queryFn: () => getRoomByID(searchID),
  });
  const dispatch = useDispatch();
  const { showingCmtList } = useSelector((state) => state.RoomComment);
  const { userSearchData } = useSelector((state) => state.location);
  const { currentUser } = useAuth();
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      checkIn: dayjs(userSearchData.checkIn, "MM-DD-YYYY"),
      checkOut: dayjs(userSearchData.checkOut, "MM-DD-YYYY"),
      guest: userSearchData.guest,
    },
  });
  const { mutate: handleSignin } = useMutation({
    mutationFn: (values) => BookingRoomAPI(values), 
    onSuccess: (values) => {
      console.log(values);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
  const onSubmit = (formValues) => {
    if (!currentUser) {
      alert('Vui lòng đăng nhập để đặt phòng')
      return
    }
    const submitedObject ={}
    submitedObject.id=0
    submitedObject.maPhong=searchID
    submitedObject.ngayDen=formValues.checkIn.format() 
    submitedObject.ngayDi = formValues.checkOut.format() 
    submitedObject.soLuongKhach=formValues.guest
    submitedObject.maNguoiDung=  currentUser.user.id
    if (validateBookingData(formValues.checkIn,formValues.checkOut,formValues.guest)) {
      alert('Xin cảm ơn bạn đã đặt phòng, Airbnb sẽ liên hệ lại với bạn trong thời gian sớm nhất!')
      handleSignin(submitedObject)
    }
  };
  const [checkInDateState, setCheckInDate] = useState("");
  const [checkOutDateState, setCheckOutDate] = useState("");
  let daysStay = "";
  if (Object.keys(userSearchData).length!=0) {
    daysStay=dayStaysValidation(userSearchData.checkIn,userSearchData.checkOut)
  }
  if (checkInDateState != "" && checkOutDateState != "") {
   daysStay=dayStaysValidation(checkInDateState,checkOutDateState)
  }

  useEffect(() => {
    dispatch(getCommentByRoomID(searchID));
  }, [searchID]);
  return (
    <div>
      <Typography
        textAlign="center"
        sx={{ fontSize: 30, fontWeight: 700, mt: 2 }}
      >
        {data.tenPhong}
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Item sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontWeight: "700" }}>
                {" "}
                <StarIcon sx={{ color: "#EEC759" }} /> 4.83(chỗ ở được đề xuất)
              </Typography>
              <Typography>
                {" "}
                <EmojiPeopleIcon sx={{ color: "#864622" }} /> Chủ nhà siêu thân
                thiện
              </Typography>
              <Typography>
                {" "}
                <LocationOnIcon sx={{ color: "#864622" }} /> Thành phố Vũng Tàu,Bà
                Rịa-Vũng Tàu, Việt Nam
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item sx={{ display: "flex", justifyContent: "end" }}>
              <Typography>
                {" "}
                <IosShareIcon sx={{ color: "#864622" }} /> Chia sẻ
              </Typography>
              <Typography>
                {" "}
                <SaveAltIcon sx={{ color: "#864622", ml: 3 }} /> Lưu
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </Box>

      <Grid container>
        <Grid
          component="img"
          item
          xs={12}
          src={data.hinhAnh}
          sx={{ mt: 2 }}
        ></Grid>
      </Grid>

      <Box sx={{ flexGrow: 1, mt: 2 }}>
        <Grid container spacing={2}>
          <Grid sx={{ display: "flex" }} item xs={7}>
            <Item>
              <Typography
                textAlign="left"
                sx={{ fontWeight: 700, fontSize: 20 }}
              >
                {" "}
                Toàn bộ căn hộ condo. Chủ nhà Phong
              </Typography>
              <Typography textAlign="left">
                {data.khach} khách- {data.phongNgu} phòng ngủ- {data.giuong}{" "}
                giường- {data.phongTam} phòng tắm
              </Typography>
              <Grid item sx={{ display: "flex" }}>
                <Item>
                  <RoofingIcon />
                </Item>
                <Item>
                  <Typography textAlign="left" sx={{ fontWeight: 700 }}>
                    Toàn bộ nhà
                  </Typography>
                  <Typography textAlign="left">
                    Bạn sẽ có chung cư cao cấp cho riêng mình
                  </Typography>
                </Item>
              </Grid>
              <Grid item sx={{ display: "flex" }}>
                <Item>
                  <AutoAwesomeIcon />
                </Item>
                <Item>
                  <Typography textAlign="left" sx={{ fontWeight: 700 }}>
                    Vệ sin tăng cường
                  </Typography>
                  <Typography textAlign="left">
                    Chủ nhà này đã cam kết thực hiện quy trình vệ sinh tăng
                    cường 5 bước của Airbnb{" "}
                    <Typography
                      sx={{ fontWeight: 700, textDecoration: "underline" }}
                    >
                      Hiển thị thêm
                    </Typography>{" "}
                  </Typography>
                </Item>
              </Grid>
              <Grid item sx={{ display: "flex" }}>
                <Item>
                  <FaceRetouchingNaturalIcon />
                </Item>
                <Item>
                  <Typography textAlign="left" sx={{ fontWeight: 700 }}>
                    Phong là chủ nhà siêu cấp
                  </Typography>
                  <Typography textAlign="left">
                    Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh
                    giá cao và là những người cam kết mang lại quãng thời gian
                    tuyệt với cho khách.{" "}
                  </Typography>
                </Item>
              </Grid>
              <Grid item sx={{ display: "flex" }}>
                <Item>
                  <EventAvailableIcon />
                </Item>
                <Item>
                  <Typography textAlign="left" sx={{ fontWeight: 700 }}>
                    Miễn phí hủy trong 48 giờ
                  </Typography>
                </Item>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  border: 2,
                  justifyContent: "space-between",
                }}
              >
                <Item>
                  <Typography>Dịch sang tiếng việt</Typography>
                </Item>
                <Item>
                  <TranslateIcon />
                </Item>
              </Grid>
              <Grid item sx={{ display: "flex" }}>
                <Item>
                  <Typography textAlign="left">{data.moTa}</Typography>
                </Item>
              </Grid>
              <Typography
                textAlign="left"
                sx={{ fontWeight: 700, fontSize: 20 }}
              >
                {" "}
                Tiện nghi
              </Typography>
              <Grid item display="flex" justifyContent="left">
                <Item>
                  <Typography sx={{mr:10}}>
                    {" "}
                    <SoupKitchenIcon /> Bếp 
                    {data.bep ? <CheckIcon sx={{ color: "green" }} /> : ""}
                  </Typography>
                </Item>
                <Item>
                  <Typography>
                    {" "}
                    <WifiIcon /> Wifi
                    {data.wifi ? <CheckIcon sx={{ color: "green" }} /> : ""}
                  </Typography>
                </Item>
              </Grid>
              <Grid item display="flex" justifyContent="left">
                <Item>
                  <Typography sx={{mr:7.5}}>
                    {" "}
                    <TvIcon /> Tivi
                    {data.tivi ? <CheckIcon sx={{ color: "green" }} /> : ""}
                  </Typography>
                </Item>
                <Item>
                  <Typography >
                    {" "}
                    <AcUnitIcon /> Điều hòa
                    {data.dieuHoa ? <CheckIcon sx={{ color: "green" }} /> : ""}
                  </Typography>
                </Item>
              </Grid>
              <Grid item display="flex" justifyContent="left">
                <Item>
                  <Typography sx={{mr:5}}>
                    {" "}
                    <IronIcon /> Bàn là
                    {data.banLa ? <CheckIcon sx={{ color: "green" }} /> : ""}
                  </Typography>
                </Item>
                <Item>
                  <Typography>
                    {" "}
                    <BathroomIcon /> Máy giặt
                    {data.mayGiat ? <CheckIcon sx={{ color: "green" }} /> : ""}
                  </Typography>
                </Item>
              </Grid>
              <Grid item display="flex" justifyContent="space-">
                <Item>
                  <Typography sx={{mr:7.5}}>
                    {" "}
                    <PoolIcon /> Hồ bơi
                    {data.hoBoi ? <CheckIcon sx={{ color: "green" }} /> : ""}
                  </Typography>
                </Item>
                <Item>
                  <Typography>
                    {" "}
                    <LocalParkingIcon /> Đỗ xe
                    {data.doXe ? <CheckIcon sx={{ color: "green" }} /> : ""}
                  </Typography>
                </Item>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={1}>
            <Item>
              <Avatar src={avatarImg} sx={{ width: 56, height: 56 }} />
            </Item>
          </Grid>
          <Grid component='form' onSubmit={handleSubmit(onSubmit)} item xs={4}>
            <Item sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontWeight: 700, fontSize: 20 }}>
                {data.giaTien}$/ đêm
              </Typography>
              <Typography sx={{ fontWeight: "700" }}>
                {" "}
                <StarIcon sx={{ color: "#EEC759" }} /> 4.83(chỗ ở được đề xuất)
              </Typography>
            </Item>
            <Item sx={{ display: "flex", justifyContent: "space-between" }}>
              <Item>
                <Typography sx={{ fontWeight: 700 }}>Nhận phòng</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    control={control}
                    name="checkIn"
                    render={({ field }) => (
                      <DatePicker
                        value={field.value}
                        inputRef={field.ref}
                        onChange={(date) => {
                          field.onChange(date);
                          setCheckInDate(dayjs(date).format("MM-DD-YYYY"));
                        }}
                        disablePast
                        slotProps={{
                          textField: {
                            error: false,
                          },
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Item>
              <Item>
                <Typography sx={{ fontWeight: 700 }}>Trả phòng</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    control={control}
                    name="checkOut"
                    render={({ field }) => (
                      <DatePicker
                        value={field.value}
                        inputRef={field.ref}
                        onChange={(date) => {
                          field.onChange(date);
                          setCheckOutDate(dayjs(date).format("MM-DD-YYYY"));
                        }}
                        disablePast
                        slotProps={{
                          textField: {
                            error: false,
                          },
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Item>
            </Item>
            <Item>
              <Typography sx={{ fontWeight: 700 }}>Khách</Typography>
              <Autocomplete
                options={numberOfVistor}
                defaultValue={userSearchData.guest}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Thêm khách"
                    inputProps={{
                      ...params.inputProps,
                    }}
                    {...register("guest")}
                  />
                )}
              />
            </Item>
            <Item sx={{ bgcolor:'#864622', borderRadius: "20px", mt: 1 }}>
              <Button type="submit" sx={{ color: "white" }}>Đặt phòng</Button>
            </Item>
            <Item sx={{ mt: 1 }}>
              <Typography textAlign="center">
                Bạn vẫn chưa bị trừ tiền
              </Typography>
            </Item>
            <Item sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ textDecoration: "underline" }}>
                ${data.giaTien} x {daysStay} đêm
              </Typography>
              <Typography>${data.giaTien * daysStay}</Typography>
            </Item>
            <Item sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ textDecoration: "underline" }}>
                Phí dịch vụ
              </Typography>
              <Typography>$14</Typography>
            </Item>
            <Item sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontWeight: 700 }}>Tổng</Typography>
              <Typography>${data.giaTien * daysStay + 14}</Typography>
            </Item>
            <Item sx={{ display: "flex", justifyContent: "center" }}>
              <FlagIcon /> &nbsp;&nbsp;
              <Typography sx={{ textDecoration: "underline" }}>
                Báo cáo nhà/phòng cho thuê này
              </Typography>
            </Item>
          </Grid>
        </Grid>
        <Typography textAlign="left" sx={{ fontWeight: 700, fontSize: 20 }}>
          {" "}
          Bình luận
        </Typography>
        <RoomDetailComment dataBinhLuan={showingCmtList} />
        {showingCmtList?.length > 0 ? (
          <Button
            sx={{ color: "black", fontWeight: 700 }}
            onClick={() => {
              dispatch(getMoreCmtList());
            }}
          >
            Xem thêm bình luận
          </Button>
        ) : (
          <Typography>Chưa có bình luận nào</Typography>
        )}
        <br />
        <br />
        <UserComment />
  
      </Box>
    </div>
  );
};

export default RoomDetailPage;
