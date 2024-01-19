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
import bannerImg from '../../../assets/signinbanner.jpg'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../UserContext/UserContext";
import { useMutation } from "@tanstack/react-query";
import { signinAPI } from "../../../apis/userAPI";
import { PATH } from "../../../routes/path";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
const defaultTheme = createTheme();

const schemaSignup = yup.object({
    email: yup.string().required("Vui lòng nhập thông tin").email("Vui lòng nhập đúng định dạng email"),
    password: yup
      .string()
      .required("Vui lòng nhập thông tin")
  }); 
  
export default function SignIn() {
  const {  handleSignin: handleSigninContext } = useAuth();
  const navigate =useNavigate()  
  const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues: {
          email: "",
          password: "",
        },
        resolver: yupResolver(schemaSignup),
        mode: "all",
      });
      const { mutate: handleSignin } = useMutation({
        mutationFn: (values) => signinAPI(values), 
        onSuccess: (values) => {
          handleSigninContext(values);
          if (values.user.role === "USER") navigate(PATH.HOME_PAGE);
          if (values.user.role === "ADMIN") navigate(`../${PATH.ADMIN_PAGE}`);
        },
        onError: (error) => {
          console.log("error", error);
        },
      });
      const onSubmit = (formValues) => {
        handleSignin(formValues); 
      };
      
  return (
    <ThemeProvider theme={defaultTheme}>
     <Header/>
      <Grid container component="main" >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              `url(${bannerImg})`,
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
              Đăng nhập
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
                {...register("password")}
                error={Boolean(errors.password)}
                helperText={Boolean(errors.password) && errors.password.message}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2,bgcolor:'#864622' }}
              >
                Đăng nhập
              </Button>
              <Grid container>
                <Grid  item>
                  <Link  to='/sign-up'  >
                    <Typography sx={{color:'#864622'}}>Chưa có tài khoản? Đăng ký ngay</Typography>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Footer/>
    </ThemeProvider>
  );
}
