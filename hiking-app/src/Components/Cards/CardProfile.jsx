import style from "./Cards.module.css";
import { useHikings } from '../../Context/HikingContext';
import { useAuth } from '../../Context/AuthContext';
import React, { useState } from 'react';
import { AiFillSmile, AiFillHeart, AiOutlineHeart, AiOutlineComment } from  "react-icons/ai";

const CardProfile = ({hiking}) => {
  const { user } = useAuth();
  const [ like, setLike ] = useState(false);
  const [ count, setCount ] = useState(0);
  
  const toggleLike = () => {
    if(!like){
      setLike(true);
      setCount(count + 1);
    } else {
      setLike(false);
      setCount(count - 1);
    }
  };
  const { deleteHiking } = useHikings();

  return (
    <div className='container text-center'>
    <div className='card card-dark m-auto'
    style={{width: 300, cursor:"pointer"}}>
    <div className='card-header fs-xl'>
      <AiFillSmile />
      <small>HikingPlace</small>
    </div>
    <img src={hiking.image} alt="img" style={{ height:
      "fit-content"
    }} />
              <div className={style.informacion}>
            <p className={style.name}>{hiking.name}</p>
            <p className={style.details}>País: {hiking.country} <img src={hiking.flag} alt="" style={{ width: "20px", height: "15px" }}  /></p>
            <p className={style.details}>Dificultad: {hiking.difficulty}</p>
            <p className={style.details}>Continente: {hiking.continent}</p>
            <p className={style.details}>Latitud: {hiking.lat}</p>
            <p className={style.details}>Longitud: {hiking.lng}</p>
          </div>
    <div className='card-footer fs-xl d-flex' style={{ justifyContent:"space-between"}}>
    <AiOutlineComment /> {" "}
    {like ? <AiFillHeart className='text-danger' onClick={toggleLike} /> : <AiOutlineHeart onClick={toggleLike} />  } {count}
    </div>
    <button onClick={() => {
              deleteHiking(hiking.id);
            }} >Delete</button>
            <button>Edit</button>
    </div>
    <div>

          </div>
    </div>


  );
};


export default CardProfile;






// Cards.jsx
// import React, { useState } from "react";
// import Card from "../Card/Card";
// import style from "./Cards.module.css";

// const Cards = ({ hinkings }) => {
//   const cardsPerPage = 15;
//   const [currentPage, setCurrentPage] = useState(1);

//   const startIndex = (currentPage - 1) * cardsPerPage;
//   const endIndex = startIndex + cardsPerPage;

//   const paginatedHikingPlaces = hinkings.slice(startIndex, endIndex);

//   const totalPages = Math.ceil(hinkings.length / cardsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const renderPagination = () => {
//     const pagesToShow = [];
//     const range = 2;

//     for (let i = Math.max(1, currentPage - range); i <= Math.min(totalPages, currentPage + range); i++) {
//       pagesToShow.push(
//         <button
//           key={i}
//           onClick={() => handlePageChange(i)}
//           className={`${style.pageButton} ${i === currentPage ? style.active : ""}`}
//         >
//           {i}
//         </button>
//       );
//     }

//     return pagesToShow;
//   };

//   return (
//     <div>
//       <div className={style.container}>
//         {paginatedHikingPlaces.map((hikingPlace) => (
//           <Card key={hikingPlace.id} hikingPlace={hikingPlace} />
//         ))}
//       </div>
//       <div className={style.pagination}>
//         {currentPage > 1 && (
//           <button onClick={() => handlePageChange(currentPage - 1)} className={style.pageButton}>
//             {"<"}
//           </button>
//         )}
//         {renderPagination()}
//         {currentPage < totalPages && (
//           <button onClick={() => handlePageChange(currentPage + 1)} className={style.pageButton}>
//             {">"}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cards;
