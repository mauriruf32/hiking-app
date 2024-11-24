import React, { useState } from 'react';
import { AiFillSmile, AiFillHeart, AiOutlineHeart, AiOutlineComment } from  "react-icons/ai";

const FavoriteCard = ({hiking}) => {
  // let like = true;
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


  return (
    <div className='container text-center'>
    <div className='card card-dark m-auto'
    style={{width: 300, cursor:"pointer"}}>
    <div className='card-header fs-xl'>
      {/* <AiFillSmile /> */}
      <small>HikingPlace</small>
    </div>
    <img src={hiking.image} alt="img" style={{ height:
      "fit-content"
    }} />
    <div className='card-footer fs-xl d-flex' style={{ justifyContent:"space-between"}}>
    <AiOutlineComment /> {" "}
    {like ? <AiFillHeart className='text-danger' onClick={toggleLike} /> : <AiOutlineHeart onClick={toggleLike} />  } {count}
    </div>
    </div>
    </div>
  )
}

export default FavoriteCard