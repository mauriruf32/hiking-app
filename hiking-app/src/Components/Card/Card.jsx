// Card.jsx
import { Link } from "react-router-dom";
import style from "./Card.module.css";
import Mapa from "../Mapa/Mapa";
import { addFav } from "../../redux/actions";
import React, { useState, useEffect } from "react";
// import { useHikings } from '../../Context/HikingContext';


const Card = ({hiking}) => {
  // const { getHikingPlaces, hikings } = useHikings();
// console.log(hikings)

  // useEffect(() => {
  //   getHikingPlaces();
  // }, []);

  return (
    <div className={style.flip_card}>
      <div className={style.flip_card_inner}>
        <div className={style.flip_card_front}>

          <img src={hiking.image} alt="imagen" style={{ width: "300px", height: "300px" }} />
          <div className={style.informacion}>
            <p className={style.name}>{hiking.name}</p>
            <p className={style.details}>País: {hiking.country} <img src={hiking.flag} alt="" style={{ width: "20px", height: "15px" }}  /></p>
            <p className={style.details}>Dificultad: {hiking.continent}</p>
            <p className={style.details}>Continente: </p>
          </div>
        </div>
        <div className={style.flip_card_back}>
        {/* {isFav ? (
        <button onClick={handleFavorite}>❤️</button>
      ) : (
        <button  onClick={handleFavorite}>🤍</button>
      )} */}
          <Mapa lat={parseFloat(hiking.lat)} lng={parseFloat(hiking.lng)} />
        </div>
      </div>
    </div>
  );
};

export default Card;

