import React from 'react';
import { useHikings } from '../../Context/HikingContext';
import { useAuth } from '../../Context/AuthContext';
import style from "./ProfileHikings.module.css";
import CardProfile from './CardProfile'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ProfileHikings = () => {
  const { hinkings } = useHikings(); 
  const { user } = useAuth();

  const userHikings = hinkings.filter(hiking => hiking.userId === user.id);

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <div className={style.perfilcontainer} >
          <div className={style.userinfo}>
            <p>Name: {user.firstName}</p>
            <p>Email: {user.email}</p>
            <p>Email: {user.id}</p>
          </div> 
         <div className={style.usercards}>
          <Slider {...settings}>
          {userHikings.length > 0 ? (
        userHikings.map(hiking => (
          <CardProfile key={hiking.id} hiking={hiking} />
        ))
      ) : (
        <p>Aun no has creado nigun sendero.</p>
      )}
          </Slider>
      
    </div>
    </div>
    
  );
};

export default ProfileHikings;
