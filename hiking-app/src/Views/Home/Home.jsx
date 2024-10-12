import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from "./Home.module.css";
import Cards from '../../Components/Cards/Cards';
import { getHikingPlaces } from '../../redux/actions';
import SearchBar from '../../Components/SearchBar/SearchBar';
// import { userData } from '../../helpers';

const Home = () => {
  const dispatch = useDispatch();
  const hikingPlaces = useSelector(state => state.hikingPlaces);
  useEffect(() => {
    dispatch(getHikingPlaces());
  }, [dispatch]);

  return (
    <div>
      <div>
      </div>
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
