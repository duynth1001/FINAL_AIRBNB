import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AirbnbIcon from "../../assets/airbnb.svg";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "styled-components";
import LanguageIcon from "@mui/icons-material/Language";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useAuth } from "../../UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../routes/path";
const settings = ["Đăng ký thành viên", "Đăng nhập"];

const theme = createTheme({
  palette: {
    secondary: {
      main: "#E0C2FF",
      black: "#000000",
    },
  },
});

function Header() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const navigate = useNavigate()
  const handleUserOnlick = (setting) => {
    switch (setting) {
      case "Đăng ký thành viên":
        navigate(`/${PATH.SIGN_UP}`);
        break;
      case "Đăng nhập":
        navigate(`/${PATH.SIGN_IN}`);
        break;
    }
  };
  const { currentUser, handleLogout } = useAuth();
  return (
    <ThemeProvider theme={theme}>
      <AppBar
        sx={{ bgcolor: '#864422',color:'#f2e5d3' }}
        position="static"
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              component="img"
              sx={{
                display: { xs: "none", md: "flex", height: 20, width: 21.56 },
                mr: 1,
              }}
              src={AirbnbIcon}
            ></Box>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="../"
              sx={{
                mr: 135,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              airbnb
            </Typography>

            <Box
              component="img"
              sx={{
                display: { xs: "flex", md: "none", height: 20, width: 21.56 },
                mr: 1,
              }}
              src={AirbnbIcon}
            ></Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="../"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              airbnb
            </Typography>

            <Typography sx={{ mr: 2 }}>Đón tiếp khách</Typography>
            <LanguageIcon sx={{ mr: 1 }}></LanguageIcon>
            {currentUser ? (
              <Box sx={{ flexGrow: 0 }}>
                <IconButton onClick={handleOpenUserMenu}>
                  <PermIdentityIcon sx={{ color: "#f2e5d3" }} />
                </IconButton>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Button sx={{ color: "black" }} onClick={()=>{
                      navigate(`/${PATH.USER_INFO}`)
                    }}>
                      Xem thông tin cá nhân
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Button sx={{ color: "black" }}  onClick={()=>{
                    if (confirm('Bạn có chắc chắn muốn đăng xuất khỏi trang web không?')) {
                      handleLogout()
                      navigate(PATH.HOME_PAGE)
                    }
                    }}>Đăng xuất</Button>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <PermIdentityIcon sx={{ color: "#f2e5d3" }} />
                </IconButton>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Button
                        sx={{ color: "black" }}
                        onClick={() => {
                          handleUserOnlick(setting);
                        }}
                      >
                        {setting}
                      </Button>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default Header;
