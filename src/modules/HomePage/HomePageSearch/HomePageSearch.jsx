import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { numberOfVistor } from "./NumberOfVisitors";
import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useQuery } from "@tanstack/react-query";
import { getLocationAPI } from "../../../apis/homePageAPI";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, useForm } from "react-hook-form";
import { formatSearchData, validateSearchData } from "../../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../routes/path";
import { useDispatch } from "react-redux";
import { setSearchData } from "../../../store/HomePage/slice";
const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function HomePageSearch() {
  const { data = [] } = useQuery({
    queryKey: ["getLocationAPI"],
    queryFn: getLocationAPI,
  });
  const searchData = formatSearchData(data);

  const { register, control, setValue, handleSubmit } = useForm({
    defaultValues: {
      id: "",
      checkIn: "",
      checkOut: "",
      guest: "",
    },
  });
  
  const navigate = useNavigate();
  const dispatch =useDispatch()
  const onSubmit = (data) => {
    if (validateSearchData(data.id, data.checkIn, data.checkOut, data.guest)) {
      navigate({
        pathname: `${PATH.ROOM_PAGE}`,
        search: `?id=${data.id}`,
      });
     data.checkIn= data.checkIn.format('MM/DD/YYYY');
     data.checkOut= data.checkOut.format('MM/DD/YYYY');
      dispatch(setSearchData(data))
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ flexGrow: 1, pl: 20, pr: 20, bgcolor: "#864622", pt: 5, mb: -5 }}
    >
      <Grid container>
        <Grid item xs={3}>
          <Item sx={{ borderRadius: "10px 0px 0px 10px" }}>
            <Typography textAlign='left' sx={{ fontWeight: 700,ml:2 }}>
              Địa điểm
            </Typography>
            <Autocomplete
              options={searchData}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Bạn muốn đi đâu"
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  {option.tenViTri}, {option.tinhThanh}, {option.quocGia}
                </Box>
              )}
              autoHighlight
              onChange={(e, value) => setValue("id", value?.id)}
              getOptionLabel={(option) => option.tenViTri}
            />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            <Typography textAlign="left" sx={{ fontWeight: 700,ml:2 }}>
              Nhận phòng
            </Typography>
            <LocalizationProvider  dateAdapter={AdapterDayjs}>
              <Controller
                control={control}
                name="checkIn"
                render={({ field }) => (
                  <DatePicker
                    value={field.value}
                    inputRef={field.ref}
                    onChange={(date) => {
                      field.onChange(date);
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
        </Grid>
        <Grid item xs={3}>
          <Item>
            <Typography textAlign="left" sx={{ fontWeight: 700,ml:2 }}>
              Trả phòng
            </Typography>
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
                    }}
                    slotProps={{
                      textField: {
                        error: false,
                      },
                    }}
                    disablePast
                  />
                )}
              />
            </LocalizationProvider>
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
            <Typography textAlign="left" sx={{ fontWeight: 700,ml:2 }}>
              Khách
            </Typography>
            <Autocomplete
              options={numberOfVistor}
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
        </Grid>
        <Grid item xs={1}>
          <Item sx={{ borderRadius: "0px 10px 10px 0px" }}>
            <Box sx={{height:80}}>
            <Button type="submit">
              <SearchRoundedIcon
                sx={{
                  fontSize: 40,
                  mt:3,
                  color: "black",
                  borderRadius: 5,
                }}
              />
            </Button>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
