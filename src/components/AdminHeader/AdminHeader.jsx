import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Grid, Typography, createTheme } from "@mui/material";
import { ThemeProvider } from "styled-components";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useAuth } from "../../UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../routes/path";
import AirbnbIcon from "../../assets/airbnb.svg";
const theme = createTheme();

function AdminHeader() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const navigate = useNavigate();
  const { currentUser, handleLogout } = useAuth();
  return (
    <ThemeProvider theme={theme}>
      <AppBar sx={{ bgcolor: "#864422", color: "#f2e5d3" }} position="static">
        <Container maxWidth="xl">
          <Toolbar>
            {currentUser ? (
              <Box sx={{ flexGrow: 1 }}>
                <Grid container direction="row" justifyContent="space-between">
                  <Grid item sx={{ display: { xs: "none", md: "flex" },}}> 
                    <Box
                      component="img"
                      sx={{
                        display: { xs: "none", md: "flex", height: 30, width: 21.56 },
                        mt:1
                      }}
                      src={AirbnbIcon}
                    ></Box>
                    <Button
                      noWrap
                      component="a"
                      onClick={()=>{navigate(`/${PATH.ADMIN_PAGE}`)}}
                      sx={{ textDecoration: "none", color: "inherit",fontFamily:'monospace',textTransform:'none',fontSize:20,fontWeight:'700' }}
                    >
                      airbnb
                    </Button>
                  </Grid>
                  <Grid item>
                    <Typography sx={{    mt:1}}>
                      Xin chào {currentUser.user.name} &nbsp;
                      <IconButton onClick={handleOpenUserMenu}>
                        <PermIdentityIcon sx={{ color: "#f2e5d3" }} />
                      </IconButton>
                    </Typography>
                  </Grid>
                </Grid>
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
                    <Button
                      sx={{ color: "black" }}
                      onClick={() => {
                        navigate(`/${PATH.ADMIN_PAGE}/${PATH.ADMIN_INFO}`);
                      }}
                    >
                      Xem thông tin cá nhân
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Button
                      sx={{ color: "black" }}
                      onClick={() => {
                        if (
                          confirm(
                            "Bạn có chắc chắn muốn đăng xuất khỏi trang web không?"
                          )
                        ) {
                          handleLogout();
                          navigate(PATH.HOME_PAGE);
                        }
                      }}
                    >
                      Đăng xuất
                    </Button>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box></Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default AdminHeader;
