import React, { useEffect } from "react";
import { useH } from "../../redux/actions";
import Card from "../../Components/Card/Card";
// import styles from "./Favorites.module.css"; // Verifica si realmente necesitas esto

function Favorites({ favoritePlaces }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFav());
  }, [dispatch]); // Agrega dispatch como dependencia

  // const handleOrder = function(evento){
  //   dispatch(orderCards(evento.target.value))
  // }

  // const handleFilter = (evento) => {
  //   dispatch(filterCards(evento.target.value))
  // }

  return (
    <div>
      {/* <div>
        <select name="order" onChange={handleOrder} >
          <option value="A">Ascendent</option>
          <option value="D">Descendent</option>
        </select>
        <select name="filter" onChange={handleFilter} >
          <option value="All">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Genderless">Genderless</option>
          <option value="unknown">unknown</option>
        </select>
      </div> */}
      <div>
        {favoritePlaces?.map(({ Sendero, Imagen, Flag, lat, lng, País, Dificultad, Región, Continente }) => (
          <Card
            key={Sendero}
            Sendero={Sendero}
            lat={lat}
            lng={lng}
            Dificultad={Dificultad}
            Continente={Continente}
            País={País}
            Región={Región}
            Imagen={Imagen}
          />
        ))}
      </div>
    </div>
  );
}

export function mapStateToProps(state) {
  return {
    favoritePlaces: state.favoritePlaces
  };
}

export default connect(mapStateToProps)(Favorites);
