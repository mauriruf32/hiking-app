
import { useHikings } from '../../Context/HikingContext';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
// import { AiFillSmile, AiFillHeart, AiOutlineHeart, AiOutlineComment } from "react-icons/ai";

const CardProfile = ({ hiking }) => {
  const { user } = useAuth();
  const [like, setLike] = useState(false);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

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
    <div >
      <div >
        <div >
          <small>{hiking.name}</small>
        </div>
        <div >
          <img src={hiking.image} alt="img" style={{ width: "150px", height: "150px" }} />
        </div>
        <div >
          {/* <p >{hiking.name}</p>
          <p >País: {hiking.country} <img src={hiking.flag} alt="" style={{ width: "20px", height: "15px" }} /></p>
          <p >Dificultad: {hiking.difficulty}</p>
          <p >Continente: {hiking.continent}</p>
          <p >Latitud: {hiking.lat}</p>
          <p >Longitud: {hiking.lng}</p> */}
        </div>
        {/* <div className="card-footer fs-xl d-flex" style={{ justifyContent: "space-between" }}>
          <AiOutlineComment /> {" "}
          {like ? <AiFillHeart className='text-danger' onClick={toggleLike} /> : <AiOutlineHeart onClick={toggleLike} />} {count}
        </div> */}
        <div >
          <button onClick={() => deleteHiking(hiking.id)}>Delete</button>
          <button onClick={() =>navigate(`/edit/${hiking.id}`)}>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default CardProfile;


