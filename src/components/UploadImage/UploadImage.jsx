import { useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { uploadAvatarAPI } from "../../apis/userAPI";
import { useAuth } from "../../UserContext/UserContext";
const MAX_FILE_SIZE_MB = 5;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];

const UploadImage = ({ refecthAvatar }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const { currentUser,handleSignin } = useAuth();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // File type validation
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError("Invalid file type. Please upload a JPEG, PNG, or GIF image.");
      return;
    }

    // File size validation
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(
        `File size exceeds ${MAX_FILE_SIZE_MB} MB. Please choose a smaller file.`
      );
      return;
    }
    setSelectedFile(file);
    setError(null);
  };

  const { mutate: handleUploadAvatar } = useMutation({
    mutationFn: (payload) => uploadAvatarAPI(payload),
    onSuccess: (value) => {
      currentUser.user.avatar = value.avatar
      handleSignin(currentUser)
      setSelectedFile(null);
      refecthAvatar();
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("formFile", selectedFile);
      handleUploadAvatar(formData);
    } else {
      console.error("No file selected");
    }
  };

  return (
    <Box p={3} borderRadius={8} textAlign="center">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="image-file-input"
      />
      <label htmlFor="image-file-input">
        <Button sx={{ color: "black" }} component="span">
          Cập nhật ảnh avatar
        </Button>
      </label>
      {selectedFile && (
        <div>
          <Typography variant="subtitle1" mt={2} mb={1}>
            Selected Image: {selectedFile.name}
          </Typography>
          <Button sx={{ color: "black" }} onClick={handleUpload} mt={3}>
            Đăng ảnh
          </Button>
        </div>
      )}
      {error && (
        <Typography variant="body2" color="error" mt={2}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default UploadImage;
