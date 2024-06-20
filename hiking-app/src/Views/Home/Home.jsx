import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from "./Home.module.css";
import NavBar from '../../Components/NavBar/NavBar';
import Cards from '../../Components/Cards/Cards';
import { getHikingPlaces } from '../../redux/actions';

const Home = () => {
  const dispatch = useDispatch();
  const hikingPlaces = useSelector(state => state.hikingPlaces);

  useEffect(() => {
    dispatch(getHikingPlaces());
  }, [dispatch]);

  return (
    <div className={style.containerMain}>
      <NavBar />
      <Cards hikingPlaces={hikingPlaces} />
    </div>
  );
}

export default Home;
