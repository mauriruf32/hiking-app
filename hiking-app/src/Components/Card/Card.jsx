// Card.jsx
import { Link } from "react-router-dom";
import style from "./Card.module.css";
import Mapa from "../Mapa/Mapa";
import { addFav } from "../../redux/actions";
import React, { useState, useEffect } from "react";


const Card = ({ hikingPlace }) => {
  const { name, image, flag, country, difficulty, continent, duration, lat, lng } = hikingPlace;

  // const [isHidden, setIsHidden] = useState(false);
  // const [isFav, setIsFav] = useState(false);


  // const handleFavorite = () => {
  //   if (isFav) {
      
    
  //     addFav(hikingPlace);
  //   }
  //   setIsFav(!isFav);
  // };


  // useEffect(() => {
  //   if (favoritePlaces) {
  //     favoritePlaces.forEach((fav) => {
  //       if (fav.Sendero === hikingPlace.Sendero) {
  //         setIsFav(true);
  //       }
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [favoritePlaces]);

  // const onClose = () => {
  //   setIsHidden(true);
  // };

  // if (isHidden) {
  //   return null;
  // }


  return (
    <div className={style.flip_card}>
      <div className={style.flip_card_inner}>
        <div className={style.flip_card_front}>

          <img src={image} alt="imagen" style={{ width: "300px", height: "300px" }} />
          <div className={style.informacion}>
            <p className={style.name}>{name}</p>
            <p className={style.details}>País: {country} <img src={flag} alt="" style={{ width: "20px", height: "15px" }}  /></p>
            <p className={style.details}>Dificultad: {difficulty}</p>
            <p className={style.details}>Continente: {continent}</p>
          </div>
        </div>
        <div className={style.flip_card_back}>
        {/* {isFav ? (
        <button onClick={handleFavorite}>❤️</button>
      ) : (
        <button  onClick={handleFavorite}>🤍</button>
      )} */}
          <Mapa lat={parseFloat(lat)} lng={parseFloat(lng)} />
        </div>
      </div>
    </div>
  );
};

export default Card;

