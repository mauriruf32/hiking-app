import { Link, useParams } from "react-router-dom";
// import style from "./Card.module.css";
import Mapa from "../Mapa/Mapa";
import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { TfiMapAlt } from "react-icons/tfi";
import { BsInfoSquare } from "react-icons/bs";

import Likes from "../Comments/Likes";

const Card = ({ hiking }) => {
  const { id } = useParams();
  const [isFlipped, setIsFlipped] = useState(false);

  function flipCard(){
    setIsFlipped(!isFlipped);
  }

  return (
  
    <div className="card-container" >
    <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped} >
        <div className="card" >

          <img src={hiking.image} alt="imagen" style={{ width: "250px", height: "200px", margin:"15px"}} />


        </div>

        <div className="card card-back" >
          
          <Mapa lat={parseFloat(hiking.lat)} lng={parseFloat(hiking.lng)} />

        </div>
    </ReactCardFlip>
      <div className="card-datos">
        <p>{hiking.name}</p>
        <p>{hiking.country} <img src={hiking.flag} alt="" style={{ width: "20px", height: "15px" }} /></p>
        <Link to={`/hikingplaces/${hiking.id}`}>
          <BsInfoSquare size={30}  color="2d2d26" style={{ marginLeft:"20px"}}  />
        </Link> 
        <TfiMapAlt onClick={flipCard} size={35}  color="2d2d26"  style={{ marginLeft:"180px"}}  />
        <Likes hikingId={hiking.id} />

      </div>

    </div>
  );
};

export default Card;


// Card.jsx
// import { Link, useParams } from "react-router-dom";
// import style from "./Card.module.css";
// import Mapa from "../Mapa/Mapa";
// import React, { useState } from 'react';
// import { useAuth } from '../../Context/AuthContext';

// import { AiFillSmile, AiFillHeart, AiOutlineHeart, AiOutlineComment } from  "react-icons/ai";


// const Card = ({hiking}) => {
//   const { id } = useParams();
//   const [ like, setLikes ] = useState(false);
//   const [ count, setCount ] = useState(0);
//   const { likes } = useAuth()

//   const hikingLikes = likes.filter(like => like.hikingId === hiking.id);
  
//   const toggleLike = () => {
//     if(!likes){
//       setLikes(true);
//       setCount(count + 1);
//     } else {
//       setLikes(false);
//       setCount(count - 1);
//     }
//   };


//   return (
//     <div className={style.flip_card}>
//       <div className={style.flip_card_inner}>
//         <div className={style.flip_card_front}>

//           <img src={hiking.image} alt="imagen" style={{ width: "300px", height: "300px" }} />
   
//         </div>
//         <div className={style.flip_card_back}>


//           <Mapa lat={parseFloat(hiking.lat)} lng={parseFloat(hiking.lng)} />
          
//         </div>
        
//       </div>
//       <div className={style.informacion}>
//             <p className={style.name}>{hiking.name}</p>
//             <p className={style.details}>País: {hiking.country} <img src={hiking.flag} alt="" style={{ width: "20px", height: "15px" }}  /></p>
//             <p className={style.details}>Dificultad: {hiking.continent}</p>
//             <p className={style.details}>Continente: </p>
//            <Link to={`/hikingplaces/${hiking.id}`}> <button>+INFO</button></Link>
//           </div>
//           <div className='card-footer fs-xl d-flex' style={{ justifyContent:"space-between"}}>
//     <AiOutlineComment /> {" "}
//     {likes ? <AiFillHeart className='text-danger' onClick={toggleLike} /> : <AiOutlineHeart onClick={toggleLike} />  } {count}
//     </div>
//     </div>
//   );
// };

// export default Card;


