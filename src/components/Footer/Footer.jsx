import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import LanguageIcon from "@mui/icons-material/Language";
import { Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
const defaultTheme = createTheme();
const Item = styled("div")(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.grey[200]
      : theme.palette.grey[800],
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));
export default function Footer() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor:'#864622',
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid  container spacing={2}>
              <Grid textAlign="left" item xs={3}>
                <Item sx={{bgcolor:'#864622'}}>
                  <Typography
                    textAlign="left"
                    sx={{ color: "#F2E5D3", fontWeight: 700 }}
                  >
                    GIỚI THIỆU
                  </Typography>
                  <br />
                  <Typography sx={{color: "#F2E5D3"}} textAlign="left">
                    Phương thức hoạt động của Airbnb
                  </Typography>
                  <br />
                  <Typography  sx={{color: "#F2E5D3"}}  textAlign="left">Trang tin tức</Typography>
                  <br />
                  <Typography  sx={{color: "#F2E5D3"}}  textAlign="left">Nhà đầu tư</Typography>
                  <br />
                  <Typography  sx={{color: "#F2E5D3"}}  textAlign="left">Airbnb Plus</Typography>
                  <br />
                  <Typography  sx={{color: "#F2E5D3"}}  textAlign="left">Airbnb Luxe</Typography>
                  <br />
                  <Typography  sx={{color: "#F2E5D3"}}  textAlign="left">Hotel for night</Typography>
                  <br />
                  <Typography  sx={{color: "#F2E5D3"}}  textAlign="left">Airbnb for Work</Typography>
                  <br />
                  <Typography   sx={{color: "#F2E5D3"}} textAlign="left">
                    Nhờ có Airbnb, mọi thứ đều có thể
                  </Typography>
                  <br />
                  <Typography  sx={{color: "#F2E5D3"}}  textAlign="left">Cơ hội nghề nghiệp</Typography>
                  <br />
                  <Typography  sx={{color: "#F2E5D3"}}  textAlign="left">Thư của nhà sáng lập</Typography>
                  <br />
                </Item>
              </Grid>
              <Grid item xs={3}>
                <Item sx={{bgcolor:'#864622',color:'#F2E5D3'}}>
                  <Typography
                    textAlign="left"
                    sx={{ color: "#F2E5D3", fontWeight: 700 }}
                  >
                    CỘNG ĐỒNG
                  </Typography>
                  <br />

                  <Typography textAlign="left">
                    Sự đa dạng và Cảm giác thân thuộc
                  </Typography>
                  <br />

                  <Typography textAlign="left">
                    Đối tác liên kế Airbnb
                  </Typography>
                  <br />

                  <Typography textAlign="left">Chỗ ở cho tuyến đầu</Typography>
                  <br />

                  <Typography textAlign="left">
                    Lượt giới thiệu của khách
                  </Typography>
                  <br />

                  <Typography textAlign="left">Airbnb.org</Typography>
                  <br />
                </Item>
              </Grid>
              <Grid item xs={3}>
                <Item sx={{bgcolor:'#864622',color:'#F2E5D3'}}>
                  <Typography
                    textAlign="left"
                    sx={{ color: "#F2E5D3", fontWeight: 700 }}
                  >
                    ĐÓN TIẾP KHÁCH
                  </Typography>
                  <br />

                  <Typography textAlign="left">Cho thuê nhà</Typography>
                  <br />

                  <Typography textAlign="left">
                    Tổ chức Trải nghiệm trực tuyến
                  </Typography>
                  <br />

                  <Typography textAlign="left">Tổ chức trải nghiệm</Typography>
                  <br />

                  <Typography textAlign="left">
                    Đón tiếp khách có trách nhiệm
                  </Typography>
                  <br />

                  <Typography textAlign="left">Trung tâm tài nguyên</Typography>
                  <br />

                  <Typography textAlign="left">Trung tâm cộng đồng</Typography>
                  <br />
                </Item>
              </Grid>
              <Grid item xs={3}>
                <Item sx={{bgcolor:'#864622',color:'#F2E5D3'}}>
                  <Typography
                    textAlign="left"
                    sx={{ color: "#F2E5D3", fontWeight: 700 }}
                  >
                    HỖ TRỢ
                  </Typography>
                  <br />

                  <Typography textAlign="left">
                    Biện pháp ứng phó với đại dich COVID-19 của chúng tôi
                  </Typography>
                  <br />

                  <Typography textAlign="left">Trung tâm trợ giúp</Typography>
                  <br />

                  <Typography textAlign="left">Các tùy chọn hủy</Typography>
                  <br />

                  <Typography textAlign="left">Hỗ trợ khu dân cư</Typography>
                  <br />

                  <Typography textAlign="left">Tin cậy và an toàn</Typography>
                  <br />
                </Item>
              </Grid>
            </Grid>
            <br /> <hr /> <br />
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Item sx={{bgcolor:'#864622',color:'#F2E5D3'}}>
                  <Typography textAlign="left">
                    © 2021 Airbnb, Inc.All rights reserved &nbsp;&nbsp;&nbsp;
                    Quyền riêng tư &nbsp;&nbsp;&nbsp; Điều khoản
                    &nbsp;&nbsp;&nbsp; Sơ đồ trang web{" "}
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Stack  direction="row" >
                  <Item sx={{bgcolor:'#864622',color:'#F2E5D3'}}>
                    {" "}
                    <LanguageIcon />
                  </Item>
                  <Item sx={{bgcolor:'#864622',color:'#F2E5D3'}}>
                    {" "}
                    <Typography sx={{ textDecoration: "underline" }}>
                      Tiếng việt(VN)
                    </Typography>
                  </Item>
                  <Item sx={{bgcolor:'#864622',color:'#F2E5D3'}}>
                    <Typography>$ USD</Typography>
                  </Item>
                  <Item sx={{bgcolor:'#864622',color:'#F2E5D3'}}>
                    <Stack direction="row" sx={{ ml: 5 }} spacing={2}>
                      <FacebookIcon />
                      <TwitterIcon />
                      <InstagramIcon />
                    </Stack>
                  </Item>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
