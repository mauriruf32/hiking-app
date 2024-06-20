import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from "./Home.module.css";
import NavBar from '../../Components/NavBar/NavBar';
import Cards from '../../Components/Cards/Cards';
import { getHikingPlaces } from '../../redux/actions';
import SearchBar from '../../Components/SearchBar/SearchBar';

const Home = () => {
  const dispatch = useDispatch();
  const hikingPlaces = useSelector(state => state.hikingPlaces);

  useEffect(() => {
    dispatch(getHikingPlaces());
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <SearchBar/>

    <div className={style.containerMain}>
      <div>
      <Cards hikingPlaces={hikingPlaces} />

      </div>
    </div>
    </div>

  );
}

export default Home;
