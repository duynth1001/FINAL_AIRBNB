import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import bannerImg from "../../../assets/signupbanner.jpg";
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
import { useMutation } from "@tanstack/react-query";
import { signupAPI } from "../../../apis/userAPI";
import { useNavigate } from "react-router-dom";
import { validateUserInfoEdit } from "../../../helpers/helpers";
import dayjs from "dayjs";
import { PATH } from "../../../routes/path";
const defaultTheme = createTheme();

const schemaSignup = yup.object({
  hoTen: yup.string().required("Vui lòng nhập thông tin"),
  email: yup
    .string()
    .required("Vui lòng nhập thông tin")
    .email("Vui lòng nhập đúng định dạng email"),
  matKhau: yup
    .string()
    .required("Vui lòng nhập thông tin")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Vui lòng nhập mật khẩu có số, ký tự đặc biệt và chữ in hoa"
    ),
  soDt: yup
    .string()
    .required("Vui lòng nhập thông tin")
    .matches(/^\d+$/, "Vui lòng nhập định dạng số"),
});

export default function SignUp() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      hoTen: "",
      email: "",
      matKhau: "",
      soDt: "",
      ngaySinh: "",
      gioiTinh: "",
    },
    resolver: yupResolver(schemaSignup),
    mode: "all",
  });
  const navigate = useNavigate()
  const { mutate: handleSignUp } = useMutation({
    mutationFn: (values) => signupAPI(values), 
    onSuccess: (values) => {
      alert('Đăng ký thành công! Vui lòng đăng nhập vào tài khoản của bạn.')
       navigate(`../${PATH.SIGN_IN}`);
    },
    onError: (err)=>{
      alert(err.response.data.content);
    }
  });
  const onSubmit = (formValues) => {
    if (!validateUserInfoEdit(formValues.ngaySinh,formValues.gioiTinh)) {
      return
  }
  const submitedObj = {};
  submitedObj.id = 0;
  submitedObj.name = formValues.hoTen;
  submitedObj.email = formValues.email;
  submitedObj.password= formValues.matKhau
  submitedObj.phone = formValues.soDt;
  submitedObj.birthday = dayjs(formValues.ngaySinh).format("DD/MM/YYYY");
  submitedObj.gender = formValues.gioiTinh.toLowerCase() === "true";
  submitedObj.role = "USER";
   handleSignUp(submitedObj);
  };
  const oninvalid =(err)=>{console.log(err);}
  return (
    <ThemeProvider theme={defaultTheme}>
      <Header />
      <Grid container component="main">
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${bannerImg})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Đăng ký
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit,oninvalid)}
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
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("matKhau")}
                error={Boolean(errors.matKhau)}
                helperText={Boolean(errors.matKhau) && errors.matKhau.message}
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
                Đăng ký
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </ThemeProvider>
  );
}
