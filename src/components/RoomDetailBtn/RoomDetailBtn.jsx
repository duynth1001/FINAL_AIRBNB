import { Button, createTheme } from "@mui/material";
import React from "react";
import { ThemeProvider } from "styled-components";
const theme = createTheme();
const RoomDetailBtn = ({ props }) => {
  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="outlined"
        sx={{
          borderRadius: theme.shape.borderRadius,
          color: "black",
          borderColor: "black",
        }}
      >
        {props}
      </Button>
    </ThemeProvider>
  );
};

export default RoomDetailBtn;
