import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AdminHeader from "../AdminHeader/AdminHeader";
import { useState } from "react";
import UserManagePage from "../../modules/AdminPage/UserManagePage/UserManagePage";
import LocationManagePage from "../../modules/AdminPage/LocationManagePage/LocationManagePage";
import RoomManagePage from "../../modules/AdminPage/RoomManagePage/RoomManagePage";
import BookingManagePage from "../../modules/AdminPage/BookingManagePage/BookingManagePage";
import { useSearchParams } from "react-router-dom";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [pageManage, setPageManage] = useState(<UserManagePage />);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const handleOnClickDashboard = (key) => {
    if (searchParams.get("page")) {
      setSearchParams(1)
    }
    switch (key) {
      case "Quản lý người dùng":
        setPageManage(<UserManagePage />);
        break;
      case "Quản lý thông tin vị trí":
        setPageManage(<LocationManagePage />);
        break;
      case "Quản lý thông tin phòng":
        setPageManage(<RoomManagePage />);
        break;
      case "Quản lý đặt phòng":
        setPageManage(<BookingManagePage />);
        break;
      default:
        break;
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Typography textAlign="center" sx={{ fontSize: 20 }}>
        Admin Dashboard
      </Typography>
      <br />
      <Divider />
      <List>
        {[
          "Quản lý người dùng",
          "Quản lý thông tin vị trí",
          "Quản lý thông tin phòng",
          "Quản lý đặt phòng",
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                handleOnClickDashboard(text);
              }}
            >
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <AdminHeader />
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {pageManage}
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
