import { Button, Grid, Pagination } from "@mui/material";
import React, { useEffect } from "react";
import SearchBarAdmin from "../../../components/SearchBarAdmin/SearchBarAdmin";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import AdminTableDisplay from "../../../components/AdminTableDisplay/AdminTableDisplay";
import {
  adminGetUserInfo,
  adminGetUserPerPage,
} from "../../../apis/adminManageUser";
import { useState } from "react";
import { validateAdminSearch } from "../../../helpers/helpers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setUserSearchDataEmpty } from "../../../store/UserManage/slice";
import { PATH } from "../../../routes/path";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const UserManagePage = () => {
  const userPageFlag = 1;
  const { userList } = useSelector((state) => state.UserManage);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const handlePagination = (page) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };
  const [searchQueryy, setSearchQuerry] = useState();
  const [onClickSearch, setOnClickSearch] = useState(-1);
  const { userSearchData } = useSelector((state) => state.UserManage);
  const [flagTable,setFlagTable] = useState(0)
  const navigate = useNavigate()
  useEffect(() => {
    if (onClickSearch != -1) {
      dispatch(adminGetUserInfo(onClickSearch));
      setOnClickSearch(-1);
    }
    if (flagTable!=0) {
      setFlagTable(0)
    }
    dispatch(setUserSearchDataEmpty())
    dispatch(adminGetUserPerPage({ page: searchParams.get("page") }));
  }, [searchParams, onClickSearch,flagTable]);
  return (
    <div>
      <Button onClick={()=>{
        navigate(PATH.ADMIN_USER_ADD)
      }} sx={{ textDecoration: "underline",color:'black' }}>Thêm quản trị viên</Button>
      <br />
      <Stack direction="row">
        <Item>
          <SearchBarAdmin
            setSearchStr={setSearchQuerry}
            holderText={"Nhập mã người dùng"}
          />
        </Item>
        <Item>
          <Button
            onClick={() => {
              if (!validateAdminSearch(searchQueryy)) {
                return;
              }
              setOnClickSearch(searchQueryy);
            }}
            sx={{color:'black'}}
          >
            Tìm
          </Button>
        </Item>
      </Stack>
      <br />

      <AdminTableDisplay
        dataUser={userList}
        searchData={userSearchData}
        flag={userPageFlag}
        thCol1={"Mã người dùng"}
        thCol2={"Tên người dùng"}
        thCol3={"Email"}
        thCol4={"Loại người dùng"}
        setFlagTable = {setFlagTable}
      />
      {Object.keys(userSearchData).length != 0 ? (
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

export default UserManagePage;
