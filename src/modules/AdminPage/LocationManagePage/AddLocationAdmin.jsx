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
import {  useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation } from "@tanstack/react-query";
import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import {  adminLocationAddAPI } from "../../../apis/adminManageLocation";
const defaultTheme = createTheme();

const schemaSignup = yup.object({
  tenViTri: yup
    .string()
    .required("Vui lòng nhập thông tin"),
  tinhThanh: yup
    .string()
    .required("Vui lòng nhập thông tin"),
  quocGia: yup
    .string()
    .required("Vui lòng nhập thông tin"),
    hinhAnh: yup
    .string()
    .required("Vui lòng nhập thông tin")
});


export default function AddLocationAdmin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
        tenViTri: "",
        tinhThanh: "",
        quocGia: "",
        hinhAnh:""
    },
    resolver: yupResolver(schemaSignup),
    mode: "all",
  });
  const { mutate: handleAddLocation } = useMutation({
    mutationFn: (data) => adminLocationAddAPI(data),
    onSuccess: () => {
      alert('Thêm vị trí thành công, vui lòng kiểm tra lại thông tin nếu có sai sót')
    },
    onError: (err) => {
        alert(err.response.data.content);
    },
  });


  const onSubmit = (formValues) => {
    const submitedObj = {};
    submitedObj.id = 0;
    submitedObj.tenViTri = formValues.tenViTri;
    submitedObj.tinhThanh = formValues.tinhThanh;
    submitedObj.quocGia = formValues.quocGia;
    submitedObj.hinhAnh = formValues.hinhAnh;
    handleAddLocation(submitedObj);
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
              Thêm vị trí
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
                label="Tên vị trí"
                autoFocus
                {...register("tenViTri")}
                error={Boolean(errors.tenViTri)}
                helperText={Boolean(errors.tenViTri) && errors.tenViTri.message}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                label="Tỉnh thành"
                {...register("tinhThanh")}
                error={Boolean(errors.tinhThanh)}
                helperText={
                  Boolean(errors.tinhThanh) && errors.tinhThanh.message
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Quốc gia"
                {...register("quocGia")}
                error={Boolean(errors.quocGia)}
                helperText={
                  Boolean(errors.quocGia) && errors.quocGia.message
                }
              />
                 <TextField
                margin="normal"
                required
                fullWidth
                label="Link hình ảnh"
                {...register("hinhAnh")}
                error={Boolean(errors.hinhAnh)}
                helperText={
                  Boolean(errors.hinhAnh) && errors.hinhAnh.message
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "#864622" }}
              >
                Thêm vị trí
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
