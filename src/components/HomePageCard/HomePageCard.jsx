import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../routes/path";

export default function HomePageCard({maViTri, location, city, country, imgSrc }) {
  const navigate =useNavigate()
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea
        onClick={() => {
          navigate({
            pathname: `${PATH.ROOM_PAGE}`,
            search: `?id=${maViTri}`,
          });
        }}
      >
        <CardMedia component="img" height="140" src={imgSrc} />
        <CardContent>
          <Typography variant="h6" sx={{fontWeight:700}} >
           Quốc gia: {country}
          </Typography>
          <Typography>Tỉnh thành: {city}</Typography>
          <Typography>Địa chỉ: {location}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
