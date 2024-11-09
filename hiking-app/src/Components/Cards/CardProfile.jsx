
import { useHikings } from '../../Context/HikingContext';
import { useAuth } from '../../Context/AuthContext';
import React, { useState } from 'react';
import { AiFillSmile, AiFillHeart, AiOutlineHeart, AiOutlineComment } from "react-icons/ai";

const CardProfile = ({ hiking }) => {
  const { user } = useAuth();
  const [like, setLike] = useState(false);
  const [count, setCount] = useState(0);

  const toggleLike = () => {
    if (!like) {
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
      <div className='card card-dark m-auto polaroid-card'>
        <div className='card-header fs-xl'>
          <AiFillSmile />
          <small>HikingPlace</small>
        </div>
        <div className="polaroid-image">
          <img src={hiking.image} alt="img" />
        </div>
        <div className="polaroid-info">
          <p className="name">{hiking.name}</p>
          <p className="details">País: {hiking.country} <img src={hiking.flag} alt="" style={{ width: "20px", height: "15px" }} /></p>
          <p className="details">Dificultad: {hiking.difficulty}</p>
          <p className="details">Continente: {hiking.continent}</p>
          <p className="details">Latitud: {hiking.lat}</p>
          <p className="details">Longitud: {hiking.lng}</p>
        </div>
        <div className="card-footer fs-xl d-flex" style={{ justifyContent: "space-between" }}>
          <AiOutlineComment /> {" "}
          {like ? <AiFillHeart className='text-danger' onClick={toggleLike} /> : <AiOutlineHeart onClick={toggleLike} />} {count}
        </div>
        <div className="polaroid-buttons">
          <button onClick={() => deleteHiking(hiking.id)}>Delete</button>
          <button>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default CardProfile;

// import { useHikings } from '../../Context/HikingContext';
// import { useAuth } from '../../Context/AuthContext';
// import React, { useState } from 'react';
// import { AiFillSmile, AiFillHeart, AiOutlineHeart, AiOutlineComment } from  "react-icons/ai";

// const CardProfile = ({hiking}) => {
//   const { user } = useAuth();
//   const [ like, setLike ] = useState(false);
//   const [ count, setCount ] = useState(0);
  
//   const toggleLike = () => {
//     if(!like){
//       setLike(true);
//       setCount(count + 1);
//     } else {
//       setLike(false);
//       setCount(count - 1);
//     }
//   };
//   const { deleteHiking } = useHikings();

//   return (
//     <div className='container text-center'>
//     <div className='card card-dark m-auto'
//     style={{width: 300, cursor:"pointer"}}>
//     <div className='card-header fs-xl'>
//       <AiFillSmile />
//       <small>HikingPlace</small>
//     </div>
//     <img src={hiking.image} alt="img" style={{ height:
//       "fit-content"
//     }} />
//               <div className={style.informacion}>
//             <p className={style.name}>{hiking.name}</p>
//             <p className={style.details}>País: {hiking.country} <img src={hiking.flag} alt="" style={{ width: "20px", height: "15px" }}  /></p>
//             <p className={style.details}>Dificultad: {hiking.difficulty}</p>
//             <p className={style.details}>Continente: {hiking.continent}</p>
//             <p className={style.details}>Latitud: {hiking.lat}</p>
//             <p className={style.details}>Longitud: {hiking.lng}</p>
//           </div>
//     <div className='card-footer fs-xl d-flex' style={{ justifyContent:"space-between"}}>
//     <AiOutlineComment /> {" "}
//     {like ? <AiFillHeart className='text-danger' onClick={toggleLike} /> : <AiOutlineHeart onClick={toggleLike} />  } {count}
//     </div>
//     <button onClick={() => {
//               deleteHiking(hiking.id);
//             }} >Delete</button>
//             <button>Edit</button>
//     </div>
//     </div>


//   );
// };


// export default CardProfile;





