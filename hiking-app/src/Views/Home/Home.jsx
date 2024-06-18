import React from 'react';
import style from "./Home.module.css";
import NavBar from '../../Components/NavBar/NavBar';
import Cards from '../../Components/Cards/Cards';
import { hikingPlaces } from '../../utils/hikingData.js';

const Home = () => {
  return (
    <div className={style.containerMain}>
      <NavBar /> 
      <Cards hikingPlaces={hikingPlaces} />
    </div>
  );
}

export default Home;
