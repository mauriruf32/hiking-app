import { Link } from "react-router-dom";
import style from "./Card.module.css";
import { useState } from "react";
import Mapa from "../Mapa/Mapa";

const Card = ({ hikingPlace }) => {
  const { Sendero, Imagen, lat, lng, País, Dificultad, Región, Continente } = hikingPlace;

  const [isHidden, setIsHidden] = useState(false);

  const onClose = () => {
    setIsHidden(true);
  };

  if (isHidden) {
    return null;
  }

  return (
    <div className={style.flip_card}>
  <div class={style.flip_card_inner}>
    <div className={style.flip_card_front}>
      <img src={Imagen} alt="imagen" style={{width:"300px", height:"300px"}}  />
      <div className={style.informacion} >
      <p className={style.name}>País: {País}</p>
      <p className={style.name}>Sendero: {Sendero}</p>
      <p className={style.details}>Dificultad: {Dificultad}</p>
      <p className={style.details}>Región: {Región}</p>
      <p className={style.details}>Continente: {Continente}</p>
      </div>

    </div>
    <div className={style.flip_card_back}>
    <Mapa  lat={parseFloat(lat)} lng={parseFloat(lng)} />
    </div>
  </div>
</div>
    // <div className={style.card}>
    //   <Mapa lat={parseFloat(lat)} lng={parseFloat(lng)} />
    //   <Link to={`detail/${Sendero}`}>
    //     {/* No hay imagen en los datos actuales, puedes añadir un campo `image` en los datos si es necesario */}
    //     <img src={Imagen} alt="imagen" />
    //     <p className={style.name}>Sendero: {Sendero}</p>
    //     <p className={style.details}>Descripción: {Descripción}</p>
    //     <p className={style.details}>Dificultad: {Dificultad}</p>
    //     <p className={style.details}>Región: {Región}</p>
    //     <p className={style.details}>Continente: {Continente}</p>
    //   </Link>
      
    // </div>
  );
};

export default Card;
