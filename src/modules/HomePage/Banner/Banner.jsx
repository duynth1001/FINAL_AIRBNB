import { Box, Typography } from '@mui/material'
import React from 'react'
import bannerImg from '../../../assets/Banner.png' 
const Banner = () => {
  return (
   <div id='HomePageBanner'>
   <Box  sx={{bgcolor:'#864622',textAlign:'center',float:'left',mb:5}}>
      <Box component='img' sx={{width:'100%',height:'100%',pl:8,pr:8}} src={bannerImg}/>
      <Typography textAlign='center' sx={{color:'white',fontSize:30,pt:3,pb:3}}>Nhờ có Airbnb, mọi điều đều có thể</Typography>
    </Box>
    </div>
  )
}

export default Banner
