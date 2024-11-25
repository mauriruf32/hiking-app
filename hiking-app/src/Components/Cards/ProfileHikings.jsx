import React, { useEffect, useState } from 'react';
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
  const [comments, setComments] = useState([]);

  const userHikings = hinkings.filter(hiking => hiking.userId === user.id);

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  
  };

  let settings2 = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1000,
    cssEase: "linear"
  };

  useEffect(() => {
    const fetchComments = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/comments');
            const data = await response.json();
            const filteredComments = data.filter(comment => comment.userId === user.id);
            setComments(filteredComments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    fetchComments();
}, [user.id]); 

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
          <div className={style.usercomments}>
          
          <Slider {...settings2}>
                      {comments.map((c) => (
                    <div key={c.id}>
                        <p>{c.description}</p>
                        <p>Por userId: {c.userId}</p>
                    </div>
                ))}
          </Slider>
          </div>

          
    </div>

    </div>
    
  );
};

export default ProfileHikings;
