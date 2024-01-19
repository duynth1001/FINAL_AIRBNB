import * as React from "react";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { useMutation } from "@tanstack/react-query";
import { UserCommentAPI } from "../../apis/roomDetailAPI";
import { useAuth } from "../../UserContext/UserContext";
import { useDispatch } from "react-redux";
import { getNewCmtList } from "../../store/RoomComment/slice";

export default function UserComment() {
  const [userComment, setUserComment] = useState("");
  const { currentUser } = useAuth();
  const [searchParams] = useSearchParams();
  const searchID = searchParams.get("maPhong");
  const { mutate: hadnleComment } = useMutation({
    mutationFn: (values) => UserCommentAPI(values),
  
  });
  const dispatch = useDispatch();
  const handleUserCmt = () => {
    if (!currentUser) {
      alert('Vui lòng đăng nhập để bình luận')
      return
    }
    const submitedObj = {};
    submitedObj.id = 0;
    submitedObj.maPhong = parseInt(searchID);
    submitedObj.maNguoiBinhLuan = currentUser.user.id;
    submitedObj.ngayBinhLuan = dayjs(new Date()).format("dddd DD/MM/YYYY");
    submitedObj.noiDung = userComment;
    submitedObj.saoBinhLuan = 4;
    const cloneObj = structuredClone(submitedObj);
    cloneObj.tenNguoiBinhLuan = currentUser.user.name;
    cloneObj.avatar = currentUser.user.avatar;
    dispatch(getNewCmtList(cloneObj));
    hadnleComment(submitedObj)
  };
  return (
    <Box>
      <TextareaAutosize
        aria-label="empty textarea"
        placeholder="Viết bình luận..."
        onChange={(evt) => {
          setUserComment(evt.target.value);
        }}
      />
      <br />
      <br />
      <Button onClick={handleUserCmt} sx={{ color: "black", fontWeight: 700 }}>
        Đăng bình luận
      </Button>
    </Box>
  );
}

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const TextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  width: 800px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 3;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${
    theme.palette.mode === "dark" ? grey[900] : grey[50]
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
