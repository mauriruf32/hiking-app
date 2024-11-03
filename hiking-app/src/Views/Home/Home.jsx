import { useEffect } from 'react';
import style from "./Home.module.css";
import Card from '../../Components/Card/Card';
import FavoriteCard from '../../Components/Card/Favorite';
import { useHikings } from '../../Context/HikingContext';
import SearchBar from '../../Components/SearchBar/SearchBar';

const Home = () => {
  const { getHikingPlaces, hinkings } = useHikings();
console.log(hinkings)

  useEffect(() => {
    getHikingPlaces();
  }, []);


  return (
    <div>
      <div>
      </div>
      <SearchBar/>

      <div className={style.containerMain}>
      <div className={style.cardscontainer}>
        {Array.isArray(hinkings) && hinkings?.map((hiking) => (
            <Card hiking={hiking} key={hiking.id} />
            // <FavoriteCard hiking={hiking} key={hiking.id} />

      ))}

      </div>
    </div>

      </div>


  );
}

export default Home;
