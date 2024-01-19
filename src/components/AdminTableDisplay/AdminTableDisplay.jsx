import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { formatDataAdmin, formatSearchDataAdmin } from "../../helpers/helpers";
import Stack from "@mui/material/Stack";
import { useDispatch } from "react-redux";
import { adminDeleteUserInfo } from "../../apis/adminManageUser";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../routes/path";
import { adminBookingDelete } from "../../apis/adminManageBooking";
import { adminDeleteLocationInfo } from "../../apis/adminManageLocation";
import { adminDeleteRoomInfo } from "../../apis/adminManageRoom";

const Item = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AdminTableDisplay({
  thCol1,
  thCol2,
  thCol3,
  thCol4,
  dataUser,
  flag,
  searchData,
  setFlagTable
}) {
  let dataDisplay = formatDataAdmin(dataUser, flag);
  let searchDataDisplay = formatSearchDataAdmin(searchData, flag);
  const dispatch = useDispatch();
  const waitingDispatch = async(dispatchFunc,finishFunc)=>{
    await dispatchFunc()
    finishFunc()
  }
  const handleOnDelete = (id) => {
    if (id == 1) {
      alert("Đây là trường gốc, vui lòng không xóa");
      return;
    }
    if (confirm('Bạn có chắc chắn muốn xóa trường này không?')) {
    switch (flag) {
      case 1:
        waitingDispatch(dispatch(adminDeleteUserInfo(id)),setFlagTable(1))
        break;
      case 2:
        waitingDispatch(dispatch(adminDeleteLocationInfo(id)),setFlagTable(1))
        break;
      case 3:
        waitingDispatch(dispatch(adminDeleteRoomInfo(id)),setFlagTable(1))
        break;
      case 4:
        waitingDispatch(dispatch(adminBookingDelete(id)),setFlagTable(1))
        break;
      default:
        break;
    }  }
  };
  const navigate = useNavigate();
  const handleOnEdit = (id) => {
    if (id == 1) {
      alert("Đây là trường gốc, vui lòng không chỉnh sửa");
      return;
    }
    switch (flag) {
      case 1:
        navigate({
          pathname: `${PATH.ADMIN_USER_EDIT}`,
          search: `?maNguoiDung=${id}`,
        });
        break;
        case 2:
          navigate({
            pathname: `${PATH.ADMIN_LOCATION_EDIT}`,
            search: `?maViTri=${id}`,
          });
          break;
          case 3:
            navigate({
              pathname: `${PATH.ADMIN_ROOM_EDIT}`,
              search: `?maPhong=${id}`,
            });
            break;
      case 4:
        navigate({
          pathname: `${PATH.ADMIN_BOOKING_EDIT}`,
          search: `?maDatPhong=${id}`,
        });
        break;
      default:
        break;
    }
  };

  const handleOnDetail = (id) => {
    switch (flag) {
      case 1:
        navigate({
          pathname: `${PATH.ADMIN_USER_DETAIL}`,
          search: `?maNguoiDung=${id}`,
        });
        break;
        case 2:
        navigate({
          pathname: `${PATH.ADMIN_LOCATION_DETAIL}`,
          search: `?maViTri=${id}`,
        });
        break;
        case 3:
          navigate({
            pathname: `${PATH.ADMIN_ROOM_DETAIL}`,
            search: `?maPhong=${id}`,
          });
          break;
      case 4:
        navigate({
          pathname: `${PATH.ADMIN_BOOKING_DETAIL}`,
          search: `?maDatPhong=${id}`,
        });
        break;
      default:
        break;
    }
  };
  if (searchDataDisplay.filed1) {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>{thCol1} </StyledTableCell>
              <StyledTableCell>{thCol2}</StyledTableCell>
              <StyledTableCell>{thCol3}</StyledTableCell>
              <StyledTableCell>{thCol4}</StyledTableCell>
              <StyledTableCell>Hành động</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow key={searchDataDisplay.id}>
              <StyledTableCell component="th" scope="row" sx={{ width: 200 }}>
                {searchDataDisplay.filed1}
              </StyledTableCell>
              <StyledTableCell sx={{ width: 200 }}>
                {searchDataDisplay.filed2}
              </StyledTableCell>
              <StyledTableCell sx={{ width: 200 }}>
                {searchDataDisplay.filed3}
              </StyledTableCell>
              <StyledTableCell sx={{ width: 200 }}>
                {searchDataDisplay.filed4}
              </StyledTableCell>
              <StyledTableCell>
                <Button
                  onClick={() => {
                    handleOnDetail(searchDataDisplay.filed1);
                  }}
                  sx={{ color: "black", border: 2 }}
                >
                  Xem thông tin chi tiết
                </Button>
                <br /> <br />
                <Stack direction="row" spacing={5}>
                  <Item>
                    <Button
                      onClick={() => {
                        handleOnEdit(searchDataDisplay.filed1);
                      }}
                    >
                      <EditIcon sx={{ color: "green" }} />
                    </Button>
                  </Item>
                  <Item>
                    <Button
                      onClick={() => {
                        handleOnDelete(searchDataDisplay.filed1);
                      }}
                    >
                      <DeleteForeverIcon sx={{ color: "red" }} />
                    </Button>
                  </Item>
                </Stack>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>{thCol1} </StyledTableCell>
              <StyledTableCell>{thCol2}</StyledTableCell>
              <StyledTableCell>{thCol3}</StyledTableCell>
              <StyledTableCell>{thCol4}</StyledTableCell>
              <StyledTableCell>Hành động</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataDisplay?.map((row) => (
              <StyledTableRow key={row.filed1}>
                <StyledTableCell component="th" scope="row" sx={{ width: 200 }}>
                  {row.filed1}
                </StyledTableCell>
                <StyledTableCell sx={{ width: 200 }}>
                  {row.filed2}
                </StyledTableCell>
                <StyledTableCell sx={{ width: 200 }}>
                  {row.filed3}
                </StyledTableCell>
                <StyledTableCell sx={{ width: 200 }}>
                  {row.filed4}
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                    onClick={() => {
                      handleOnDetail(row.filed1);
                    }}
                    sx={{ color: "black", border: 2 }}
                  >
                    Xem thông tin chi tiết
                  </Button>
                  <br /> <br />
                  <Stack direction="row" spacing={5}>
                    <Item>
                      <Button
                        onClick={() => {
                          handleOnEdit(row.filed1);
                        }}
                      >
                        <EditIcon sx={{ color: "green" }} />
                      </Button>
                    </Item>
                    <Item>
                      <Button
                        onClick={() => {
                          handleOnDelete(row.filed1);
                        }}
                      >
                        <DeleteForeverIcon sx={{ color: "red" }} />
                      </Button>
                    </Item>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
