import React, { useEffect } from "react";
import RawDesign from "./RawDesign/RawDesign";
import HomePageSearch from "./HomePageSearch/HomePageSearch";
import Banner from "./Banner/Banner";
import NearBy from "./NearBy/NearBy";
import Footer from "../../components/Footer/Footer";
import NavBarHeader from "../../components/NavBarHeader";
import { useAuth } from "../../UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../routes/path";

const HomePage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate()
  useEffect(()=>{
    if (currentUser?.user.role=='ADMIN') {
      navigate(PATH.ADMIN_PAGE)
    }
  })
  return (
    <div>
     <NavBarHeader/>
      <HomePageSearch />
      <Banner />
      <NearBy />
      <RawDesign />
      <Footer /> 
    </div>
  );
};

export default HomePage;
