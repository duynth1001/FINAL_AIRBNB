import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
export default function CommentSection({hinhAvatar,tenNguoiCmt,ngayCmt,noiDungCmt,danhGia}) {
  return (
    <Paper
      sx={{
        maxWidth: 700,
      }}
    >
      <Grid container spacing={2} >
        <Grid item>
          <Box component='img'  sx={{ width: 70, height: 50 }} src={hinhAvatar}/>

        </Grid>
        <Grid textAlign='left' item xs={12} sm container>
          <Grid item xs container direction="column" >
            <Grid item xs>
              <Typography sx={{fontWeight:700,color:"black"}} variant="h7" >
               {tenNguoiCmt}
              </Typography>
              <Typography sx={{fontSize:12}}>{ngayCmt}</Typography>
              <Typography  sx={{fontSize:14}}>
                {noiDungCmt}
              </Typography>
              <Typography sx={{fontSize:12}}>
                 Đánh giá : {danhGia}  <StarIcon sx={{fontSize:15,color:'#EEC759'}}/>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
