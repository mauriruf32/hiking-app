// Card.jsx
import { Link } from "react-router-dom";
import style from "./Card.module.css";
import { useState } from "react";
import Mapa from "../Mapa/Mapa";

const Card = ({ hikingPlace }) => {
  const { Sendero, Imagen, Flag, lat, lng, País, Dificultad, Región, Continente } = hikingPlace;

  const [isHidden, setIsHidden] = useState(false);

  const onClose = () => {
    setIsHidden(true);
  };

  if (isHidden) {
    return null;
  }

  return (
    <div className={style.flip_card}>
      <div className={style.flip_card_inner}>
        <div className={style.flip_card_front}>
          <img src={Imagen} alt="imagen" style={{ width: "300px", height: "300px" }} />
          <div className={style.informacion}>
            <p className={style.name}>{Sendero}</p>
            <p className={style.details}>País: {País} <img src={Flag} alt="" style={{ width: "20px", height: "15px" }}  /></p>
            <p className={style.details}>Dificultad: {Dificultad}</p>
            <p className={style.details}>Región: {Región}</p>
            <p className={style.details}>Continente: {Continente}</p>
          </div>
        </div>
        <div className={style.flip_card_back}>
          <Mapa lat={parseFloat(lat)} lng={parseFloat(lng)} />
        </div>
      </div>
    </div>
  );
};

export default Card;

