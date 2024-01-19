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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import { useMutation } from "@tanstack/react-query";
import { userInfoUpdateAPI } from "../../../apis/userAPI";
import { useAuth } from "../../../UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import { validateUserInfoEdit } from "../../../helpers/helpers";
const defaultTheme = createTheme();

const schemaSignup = yup.object({
  hoTen: yup.string().required("Vui lòng nhập thông tin"),
  email: yup
    .string()
    .required("Vui lòng nhập thông tin")
    .email("Vui lòng nhập đúng định dạng email"),
  soDt: yup
    .string()
    .required("Vui lòng nhập thông tin")
    .matches(/^\d+$/, "Vui lòng nhập định dạng số"),
});

export default function UserInfoEdit() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      hoTen: "",
      email: "",
      soDt: "",
      ngaySinh: "",
      gioiTinh: "",
    },
    resolver: yupResolver(schemaSignup),
    mode: "all",
  });
  const navigate =useNavigate()
  const { mutate: handleUpdateUserInfo } = useMutation({
    mutationFn: (data) => userInfoUpdateAPI(data),
    onSuccess: () => {
        alert('Cập nhật thông tin thành công')
          navigate('../')
    },
    onError: (err) => {
      alert(err.response.data.content)
    },
  });
  const { currentUser,handleSignin } = useAuth();
  const onSubmit = (formValues) => {
    if (!validateUserInfoEdit(formValues.ngaySinh,formValues.gioiTinh)) {
        return
    }
    const submitedObj = {};
    submitedObj.id = 0;
    currentUser.user.name=submitedObj.name = formValues.hoTen;
    currentUser.user.email=submitedObj.email = formValues.email;
    currentUser.user.phone=submitedObj.phone = formValues.soDt;
    currentUser.user.birthday= submitedObj.birthday = dayjs(formValues.ngaySinh).format("DD/MM/YYYY");
    currentUser.user.gender= submitedObj.gender = formValues.gioiTinh.toLowerCase() === "true";
    submitedObj.role = 'USER';
    handleSignin(currentUser)
    const sentData = {}
     sentData.payload = submitedObj
     sentData.params = currentUser.user.id
    handleUpdateUserInfo(sentData);
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Header />
      <Grid container component="main">
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
              Chỉnh sửa thông tin cá nhân
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
                id="fullname"
                label="Họ tên"
                name="fullname"
                autoFocus
                {...register("hoTen")}
                error={Boolean(errors.hoTen)}
                helperText={Boolean(errors.hoTen) && errors.hoTen.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email"
                type="email"
                id="email"
                autoComplete="current-email"
                {...register("email")}
                error={Boolean(errors.email)}
                helperText={Boolean(errors.email) && errors.email.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="phone"
                label="Số điện thoại"
                type="phone"
                id="phone"
                {...register("soDt")}
                error={Boolean(errors.soDt)}
                helperText={Boolean(errors.soDt) && errors.soDt.message}
              />
              <br />
              <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  control={control}
                  name="ngaySinh"
                  render={({ field }) => (
                    <DatePicker
                      label="Ngày sinh"
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
              <br />
              <FormControl sx={{ mt: 2 }}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Giới tính
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio {...register("gioiTinh")} />}
                    label="Nam"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio {...register("gioiTinh")} />}
                    label="Nữ"
                  />
                </RadioGroup>
              </FormControl>
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
      <Footer />
    </ThemeProvider>
  );
}
