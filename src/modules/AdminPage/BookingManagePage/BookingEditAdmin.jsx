import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation, useQuery } from "@tanstack/react-query";
import {  useSearchParams } from "react-router-dom";
import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import { adminBookingUpdateAPI, adminGetBookingInfo_querry } from "../../../apis/adminManageBooking";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { dayStaysValidation } from "../../../helpers/helpers";
const defaultTheme = createTheme();

const schemaSignup = yup.object({
  maphong: yup
    .string()
    .required("Vui lòng nhập thông tin")
    .matches(/^\d+$/, "Vui lòng nhập định dạng số"),
  soLuongKhach: yup
    .string()
    .required("Vui lòng nhập thông tin")
    .matches(/^\d+$/, "Vui lòng nhập định dạng số"),
  maNguoiDung: yup
    .string()
    .required("Vui lòng nhập thông tin")
    .matches(/^\d+$/, "Vui lòng nhập định dạng số"),
});
const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function BookingEditAdmin() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      maphong: "",
      soLuongKhach: "",
      maNguoiDung: "",
    },
    resolver: yupResolver(schemaSignup),
    mode: "all",
  });
  const { mutate: handleUpadteBooking } = useMutation({
    mutationFn: (data) => adminBookingUpdateAPI(data),
    onSuccess: () => {
      alert("Cập nhật thông tin thành công, vui lòng kiểm tra lại nếu có sai sót");
    },
    onError: (err) => {
      alert(err.response.data.content);
    },
  });

  const [searchParams] = useSearchParams();
  const bookingID = searchParams.get("maDatPhong");
  const { data: bookingData = [] } = useQuery({
    queryKey: ["adminGetUserInfo"],
    queryFn: () => adminGetBookingInfo_querry(bookingID),
  });
  const onSubmit = (formValues) => {
    if (formValues.ngayDen == " " || formValues.ngayDi == "") {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (dayStaysValidation(formValues.ngayDen,formValues.ngayDi)==0) {
        return
    }
    const submitedObj = {};
    submitedObj.id = 0;
    submitedObj.maPhong = formValues.maphong;
    submitedObj.ngayDen = new Date(formValues.ngayDen).toISOString();
    submitedObj.ngayDi = new Date(formValues.ngayDi).toISOString();
    submitedObj.soLuongKhach=formValues.soLuongKhach
    submitedObj.maNguoiDung=formValues.maNguoiDung
    const sentData = {};
    sentData.payload = submitedObj;
    sentData.params = bookingData.id;
    handleUpadteBooking(sentData);
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main">
        <AdminHeader />
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={8}
          md={12}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#864622" }}>
              <EditIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Chỉnh sửa thông tin đặt phòng(mã {bookingData.id})
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="Mã phòng"
                autoFocus
                {...register("maphong")}
                error={Boolean(errors.maphong)}
                helperText={Boolean(errors.maphong) && errors.maphong.message}
              />
              <Stack direction="row" spacing={2}>
                <Item>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                      control={control}
                      name="ngayDen"
                      render={({ field }) => (
                        <DatePicker
                          label="Ngày đi"
                          value={field.value}
                          inputRef={field.ref}
                          onChange={(date) => {
                            field.onChange(date);
                          }}
                          disableFuture
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
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                      control={control}
                      name="ngayDi"
                      render={({ field }) => (
                        <DatePicker
                          label="Ngày đến"
                          value={field.value}
                          inputRef={field.ref}
                          onChange={(date) => {
                            field.onChange(date);
                          }}
                          disableFuture
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
              </Stack>

              <TextField
                margin="normal"
                required
                fullWidth
                name="soLuongKhach"
                label="Số lượng khách"
                {...register("soLuongKhach")}
                error={Boolean(errors.soLuongKhach)}
                helperText={
                  Boolean(errors.soLuongKhach) && errors.soLuongKhach.message
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Mã người dùng"
                {...register("maNguoiDung")}
                error={Boolean(errors.maNguoiDung)}
                helperText={
                  Boolean(errors.maNguoiDung) && errors.maNguoiDung.message
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "#864622" }}
              >
                Cập nhật thông tin
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
