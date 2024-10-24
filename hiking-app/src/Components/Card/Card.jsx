// Card.jsx
import { Link, useParams } from "react-router-dom";
import style from "./Card.module.css";
import Mapa from "../Mapa/Mapa";
import { addFav } from "../../redux/actions";
import React, { useState, useEffect } from "react";
// import { useHikings } from '../../Context/HikingContext';


const Card = ({hiking}) => {
  const { id } = useParams();

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
   
        </div>
        <div className={style.flip_card_back}>


          <Mapa lat={parseFloat(hiking.lat)} lng={parseFloat(hiking.lng)} />
          
        </div>
        
      </div>
      <div className={style.informacion}>
            <p className={style.name}>{hiking.name}</p>
            <p className={style.details}>País: {hiking.country} <img src={hiking.flag} alt="" style={{ width: "20px", height: "15px" }}  /></p>
            <p className={style.details}>Dificultad: {hiking.continent}</p>
            <p className={style.details}>Continente: </p>
           <Link to={`/hikingplaces/${hiking.id}`}> <button>+INFO</button></Link>
          </div>
    </div>
  );
};

export default Card;

