import { Button, Grid, Pagination } from "@mui/material";
import React, { useEffect } from "react";
import SearchBarAdmin from "../../../components/SearchBarAdmin/SearchBarAdmin";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import AdminTableDisplay from "../../../components/AdminTableDisplay/AdminTableDisplay";
import { useState } from "react";
import { validateAdminSearch } from "../../../helpers/helpers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PATH } from "../../../routes/path";
import { adminGetLocationInfo, adminGetLocationPerPage } from "../../../apis/adminManageLocation";
import { setLocationSearchDataEmpty } from "../../../store/LocationManage/slice";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const LocationManagePage = () => {
  const userPageFlag = 2;
  const { locationList } = useSelector((state) => state.LocationManage);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const handlePagination = (page) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };
  const [searchQueryy, setSearchQuerry] = useState();
  const [onClickSearch, setOnClickSearch] = useState(-1);
  const { locationSearchData } = useSelector((state) => state.LocationManage);
  const [flagTable,setFlagTable] = useState(0)
  const navigate = useNavigate()
  useEffect(() => {
    if (onClickSearch != -1) {
      dispatch(adminGetLocationInfo(onClickSearch));
      setOnClickSearch(-1);
    }
    if (flagTable!=0) {
      setFlagTable(0)
    }
    dispatch(setLocationSearchDataEmpty())
    dispatch(adminGetLocationPerPage({ page: searchParams.get("page") }));
  }, [searchParams, onClickSearch,flagTable]);
  return (
    <div>
      <Button onClick={()=>{
        navigate(PATH.ADMIN_LOCATION_ADD)
      }} sx={{ textDecoration: "underline",color:'black' }}>Thêm vị trí</Button>
      <br />
      <Stack direction="row">
        <Item>
          <SearchBarAdmin
            setSearchStr={setSearchQuerry}
            holderText={"Nhập mã vị trí"}
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
        dataUser={locationList}
        searchData={locationSearchData}
        flag={userPageFlag}
        thCol1={"Mã vị trí"}
        thCol2={"Tên vị trí"}
        thCol3={"Tỉnh thành"}
        thCol4={"Quốc gia"}
        setFlagTable = {setFlagTable}
      />
      {Object.keys(locationSearchData).length != 0 ? (
        <div></div>
      ) : (
        <div>
          {" "}
          <Grid container justifyContent="center" sx={{ mt: 5 }}>
            <Pagination
              count={200}
              size="large"
              onChange={(evt, value) => {
                handlePagination(value);
              }}
            />
          </Grid>
        </div>
      )}
    </div>
  );
};

export default LocationManagePage;
