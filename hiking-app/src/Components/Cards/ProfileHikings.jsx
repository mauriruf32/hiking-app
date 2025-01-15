import React, { useEffect, useState } from 'react';
import { useHikings } from '../../Context/HikingContext';
import { useAuth } from '../../Context/AuthContext';
import style from "./ProfileHikings.module.css";
import CardProfile from './CardProfile'; 
// import FavoriteCard from '../Card/Favorite'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';

const ProfileHikings = () => {
  const { hinkings } = useHikings(); 
  const { user, likes } = useAuth();
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const userHikings = hinkings.filter(hiking => hiking.userId === user.id);
  // const userLikedHikings = likes.filter(like => like.userId === user.id);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "2d2d26" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }
  

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  
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
          <img src={user.image} alt="imagen" style={{ width: "150px", height: "150px", borderRadius:"100px"}} />
            <p>Name: {user.firstName}</p>
            <p>LastName: {user.lastName}</p>
            <p>Phone: {user.phoneNumber}</p>
            <p>birthDAy: {user.birthDate}</p>
            <p>Ema,il: {user.email}</p>
            <p>Id: {user.id}</p>
            <button onClick={() =>navigate(`/profile/${user.id}`)}>Edit</button>
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
          {/* <Slider {...settings}>
          {userLikedHikings.length > 0 ? (
        userLikedHikings.map(like => (
          <FavoriteCard key={like.id} like={like} />
        ))
      ) : (
        <p>Aun no has creado nigun sendero.</p>
      )}
          </Slider> */}
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
