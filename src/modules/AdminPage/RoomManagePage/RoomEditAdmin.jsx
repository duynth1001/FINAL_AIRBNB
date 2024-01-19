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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import { adminGetRoomInfo_querry, adminRoomUpdateAPI } from "../../../apis/adminManageRoom";
const defaultTheme = createTheme();

const schemaSignup = yup.object({
  tenPhong: yup.string().required("Vui lòng nhập thông tin"),
  khach: yup
    .string()
    .required("Vui lòng nhập thông tin")
    .matches(/^\d+$/, "Vui lòng nhập định dạng số"),
  phongNgu: yup
    .string()
    .required("Vui lòng nhập thông tin")
    .matches(/^\d+$/, "Vui lòng nhập định dạng số"),
  giuong: yup
    .string()
    .required("Vui lòng nhập thông tin")
    .matches(/^\d+$/, "Vui lòng nhập định dạng số"),
  phongtam: yup
    .string()
    .required("Vui lòng nhập thông tin")
    .matches(/^\d+$/, "Vui lòng nhập định dạng số"),
  moTa: yup.string().required("Vui lòng nhập thông tin"),
  giaTien: yup
    .string()
    .required("Vui lòng nhập thông tin")
    .matches(/^\d+$/, "Vui lòng nhập định dạng số"),
  maViTri: yup
    .string()
    .required("Vui lòng nhập thông tin")
    .matches(/^\d+$/, "Vui lòng nhập định dạng số"),
  hinhAnh: yup.string().required("Vui lòng nhập thông tin"),
});

export default function RoomEditAdmin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tenPhong: "",
      khach: "",
      phongNgu: "",
      giuong: "",
      phongtam: "",
      moTa: "",
      giaTien: "",
      mayGiat: "",
      banLa: "",
      tivi: "",
      dieuHoa: "",
      wifi: "",
      bep: "",
      doXe: "",
      hoBoi: "",
      banUi: "",
      maViTri: "",
      hinhAnh: "",
    },
    resolver: yupResolver(schemaSignup),
    mode: "all",
  });
  const { mutate: handleUpdateRoomInfo } = useMutation({
    mutationFn: (data) => adminRoomUpdateAPI(data),
    onSuccess: () => {
      alert(
        "Cập nhật thông tin thành công, vui lòng kiểm tra lại nếu có sai sót"
      );
    },
    onError: (err) => {
      alert(err.response.data.content);
    },
  });

  const [searchParams] = useSearchParams();
  const roomID = searchParams.get("maPhong");
  const { data: roomData = [] } = useQuery({
    queryKey: ["adminGetRoomInfo"],
    queryFn: () => adminGetRoomInfo_querry(roomID),
  });
  const onSubmit = (formValues) => {
    if (
      formValues.mayGiat == "" ||
      formValues.banLa == "" ||
      formValues.tivi == "" ||
      formValues.dieuHoa == "" ||
      formValues.wifi == "" ||
      formValues.bep == "" ||
      formValues.doXe == "" ||
      formValues.hoBoi == "" ||
      formValues.banUi == ""
    ) {
       alert('Vui lòng nhập đầy đủ thông tin') 
      return;
    }
    const submitedObj = {};
    submitedObj.id = 0;
    submitedObj.tenPhong = formValues.tenPhong;
    submitedObj.khach = formValues.khach;
    submitedObj.phongNgu = formValues.phongNgu;
    submitedObj.giuong = formValues.giuong;
    submitedObj.phongtam = formValues.phongtam;
    submitedObj.moTa = formValues.moTa;
    submitedObj.giaTien = formValues.giaTien;
    submitedObj.mayGiat = formValues.mayGiat;
    submitedObj.banLa = formValues.banLa;
    submitedObj.tivi = formValues.tivi;
    submitedObj.dieuHoa = formValues.dieuHoa;
    submitedObj.wifi = formValues.wifi;
    submitedObj.bep = formValues.bep;
    submitedObj.doXe = formValues.doXe;
    submitedObj.hoBoi = formValues.hoBoi;
    submitedObj.banUi = formValues.banUi;
    submitedObj.maViTri = formValues.maViTri;
    submitedObj.hinhAnh = formValues.hinhAnh;
    const sentData = {};
    sentData.payload = submitedObj;
    sentData.params = roomData.id;
    handleUpdateRoomInfo(sentData);
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
              Chỉnh sửa thông tin phòng(mã {roomData.id})
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
                label="Tên phòng"
                autoFocus
                {...register("tenPhong")}
                error={Boolean(errors.tenPhong)}
                helperText={Boolean(errors.tenPhong) && errors.tenPhong.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Số khách"
                {...register("khach")}
                error={Boolean(errors.khach)}
                helperText={Boolean(errors.khach) && errors.khach.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="phongNgu"
                label="Số phòng ngủ"
                {...register("phongNgu")}
                error={Boolean(errors.phongNgu)}
                helperText={Boolean(errors.phongNgu) && errors.phongNgu.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="giuong"
                label="Số giường"
                {...register("giuong")}
                error={Boolean(errors.giuong)}
                helperText={Boolean(errors.giuong) && errors.giuong.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="giuong"
                label="Số phòng tắm"
                {...register("phongtam")}
                error={Boolean(errors.phongtam)}
                helperText={Boolean(errors.phongtam) && errors.phongtam.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="giuong"
                label="Mô tả"
                {...register("moTa")}
                error={Boolean(errors.moTa)}
                helperText={Boolean(errors.moTa) && errors.moTa.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="giaTien"
                label="Giá tiền"
                {...register("giaTien")}
                error={Boolean(errors.giaTien)}
                helperText={Boolean(errors.giaTien) && errors.giaTien.message}
              />
              <Typography
                sx={{ mt: 2, fontSize: 18, textDecoration: "underline" }}
              >
                Các dịch vụ đi kèm
              </Typography>
              <FormControl sx={{ mt: 2 }}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Dịch vụ máy giặt
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio {...register("mayGiat")} />}
                    label="Có"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio {...register("mayGiat")} />}
                    label="Không"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl sx={{ mt: 2 }}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Dịch vụ bàn là
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio {...register("banLa")} />}
                    label="Có"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio {...register("banLa")} />}
                    label="Không"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl sx={{ mt: 2 }}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Dịch vụ ti vi
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio {...register("tivi")} />}
                    label="Có"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio {...register("tivi")} />}
                    label="Không"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl sx={{ mt: 2 }}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Dịch vụ điều hòa
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio {...register("dieuHoa")} />}
                    label="Có"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio {...register("dieuHoa")} />}
                    label="Không"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl sx={{ mt: 2 }}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Dịch vụ Wi Fi
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio {...register("wifi")} />}
                    label="Có"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio {...register("wifi")} />}
                    label="Không"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl sx={{ mt: 2 }}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Dịch vụ bếp
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio {...register("bep")} />}
                    label="Có"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio {...register("bep")} />}
                    label="Không"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl sx={{ mt: 2 }}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Dịch vụ đỗ xe
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio {...register("doXe")} />}
                    label="Có"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio {...register("doXe")} />}
                    label="Không"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl sx={{ mt: 2 }}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Dịch vụ hồ bơi
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio {...register("hoBoi")} />}
                    label="Có"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio {...register("hoBoi")} />}
                    label="Không"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl sx={{ mt: 2 }}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Dịch vụ hồ bơi
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio {...register("hoBoi")} />}
                    label="Có"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio {...register("hoBoi")} />}
                    label="Không"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl sx={{ mt: 2 }}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Dịch vụ bàn ủi
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio {...register("banUi")} />}
                    label="Có"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio {...register("banUi")} />}
                    label="Không"
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                margin="normal"
                required
                fullWidth
                name="maViTri"
                label="Mã vị trí"
                {...register("maViTri")}
                error={Boolean(errors.maViTri)}
                helperText={Boolean(errors.maViTri) && errors.maViTri.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="hinhAnh"
                label="Link hình ảnh"
                {...register("hinhAnh")}
                error={Boolean(errors.hinhAnh)}
                helperText={Boolean(errors.hinhAnh) && errors.hinhAnh.message}
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
