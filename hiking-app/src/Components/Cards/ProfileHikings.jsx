
// import React, { useEffect, useState } from 'react';
// import { useHikings } from '../../Context/HikingContext';
// import { useAuth } from '../../Context/AuthContext';
// import style from "./ProfileHikings.module.css";
// import CardProfile from './CardProfile'; 
// import Cloudinary from './CloudImageUploader.jsx'; 
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// import { useNavigate, useParams } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { useHikings } from '../../Context/HikingContext';
import { useAuth } from '../../Context/AuthContext';
import style from "./ProfileHikings.module.css";
import CardProfile from './CardProfile'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const ProfileHikings = () => {
  const { hinkings } = useHikings(); 
  const { user, updateUserProfile } = useAuth();
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const preset_name = "jvu2gwik";
  const cloud_name = "djsqt7j6v";
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const params = useParams();

  useEffect(() => {
    const fetchComments = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/comments');
            const data = await response.json();
            const filteredComments = data.filter(comment => comment.userId === user.id);
            setComments(filteredComments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };
    fetchComments();
  }, [user.id]);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', preset_name);
    setFile(URL.createObjectURL(files[0]));
    setLoading(true);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
            method: 'POST',
            body: data
        });

        const file = await response.json();
        setValue("image", file.secure_url);
        await updateUserProfile(user.id, { image: file.secure_url });
        setLoading(false);
    } catch (error) {
        console.error('Error uploading image:', error);
        setLoading(false);
    }
  };

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
  };

  let settings2 = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1000,
    cssEase: "linear"
  };

  return (
    <div className={style.perfilcontainer} >
      <div className={style.userinfo}>
        <img src={user.image} alt="imagen" style={{ width: "150px", height: "150px", borderRadius:"100px"}} />
        <form>
          <input type="file" placeholder="Subir imagen a Cloudinary" onChange={uploadImage} />
          {loading ? (<h3>Cargando Imagenes...</h3>) : (<img src="" alt="" />)}
        </form>
        <p>Name: {user.firstName}</p>
        <p>LastName: {user.lastName}</p>
        <p>Phone: {user.phoneNumber}</p>
        <p>birthDAy: {user.birthDate}</p>
        <p>Email: {user.email}</p>
        <p>Id: {user.id}</p>
        <button onClick={() => navigate(`/profile/${user.id}`)}>Edit</button>
      </div> 

      <div className={style.usercards}>
        <Slider {...settings}>
          {hinkings.filter(hiking => hiking.userId === user.id).length > 0 ? (
            hinkings.filter(hiking => hiking.userId === user.id).map(hiking => (
              <CardProfile key={hiking.id} hiking={hiking} />
            ))
          ) : (
            <p>Aún no has creado ningún sendero.</p>
          )}
        </Slider>

        <div className={style.usercomments}>
          <Slider {...settings2}>
            {comments.map((c) => (
              <div key={c.id}>
                <p>{c.description}</p>
                <p>Por userId: {c.userId}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ProfileHikings;


// const ProfileHikings = () => {
//   const { hinkings } = useHikings(); 
//   const { user,  updateUserProfile  } = useAuth();
//   const [comments, setComments] = useState([]);
//   const navigate = useNavigate();
//       const preset_name = "jvu2gwik";
//       const cloud_name = "djsqt7j6v";
//       const [loading, setLoading] = useState(false);
//         const [file, setFile] = useState();
//           const [imagen, setImagen] = useState("");
//            const { register, handleSubmit, formState: { errors }, setValue } = useForm();
//     const params = useParams();

//         const onSubmit = handleSubmit((data) => {
//             if (params.id) {
//                 updateUserProfile(params.id, data);
//             };
//             navigate("/profile")
//         });
//   const userHikings = hinkings.filter(hiking => hiking.userId === user.id);
//   // const userLikedHikings = likes.filter(like => like.userId === user.id);

//   function SampleNextArrow(props) {
//     const { className, style, onClick } = props;
//     return (
//       <div
//         className={className}
//         style={{ ...style, display: "block", background: "2d2d26" }}
//         onClick={onClick}
//       />
//     );
//   }
  
//   function SamplePrevArrow(props) {
//     const { className, style, onClick } = props;
//     return (
//       <div
//         className={className}
//         style={{ ...style, display: "block", background: "green" }}
//         onClick={onClick}
//       />
//     );
//   }
  

//   let settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 2,
//     slidesToScroll: 1,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />
  
//   };

//   let settings2 = {
//     dots: true,
//     infinite: true,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     speed: 2000,
//     autoplaySpeed: 1000,
//     cssEase: "linear"
//   };

//   useEffect(() => {
//     const fetchComments = async () => {
//         try {
//             const response = await fetch('http://localhost:3001/api/comments');
//             const data = await response.json();
//             const filteredComments = data.filter(comment => comment.userId === user.id);
//             setComments(filteredComments);
//         } catch (error) {
//             console.error('Error fetching comments:', error);
//         }
//     };

//     fetchComments();
// }, [user.id]); 

// const uploadImage = async (e) => {
//   const files = e.target.files;
//   const data = new FormData();
//   data.append('file', files[0]);
//   data.append('upload_preset', preset_name);
//   console.log(e.target.files);
//   setFile(URL.createObjectURL(e.target.files[0]));
//   setLoading(true);

//   try {
//       const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
//           method: 'POST',
//           body: data
//       });

//       const file = await response.json();
//       setValue("image", file.secure_url);
//       setLoading(false);
//   } catch (error) {
//       console.error('Error uploading image:', error);
//       setLoading(false);
//   }
// };


//   return (
//     <div className={style.perfilcontainer} >
//           <div className={style.userinfo}>
//           <img src={user.image} alt="imagen" style={{ width: "150px", height: "150px", borderRadius:"100px"}} />
//           <form>
//         <input type="file" placeholder="Subir imagen a Cloudinary" onChange={uploadImage} />
//         {loading ? (<h3>Cargando Imagenes...</h3>) : (<img src=""/>)}
//       </form>
//             <p>Name: {user.firstName}</p>
//             <p>LastName: {user.lastName}</p>
//             <p>Phone: {user.phoneNumber}</p>
//             <p>birthDAy: {user.birthDate}</p>
//             <p>Ema,il: {user.email}</p>
//             <p>Id: {user.id}</p>
//             <button onClick={() =>navigate(`/profile/${user.id}`)}>Edit</button>
//           </div> 

//          <div className={style.usercards}>
//           <Slider {...settings}>
//           {userHikings.length > 0 ? (
//         userHikings.map(hiking => (
//           <CardProfile key={hiking.id} hiking={hiking} />
//         ))
//       ) : (
//         <p>Aun no has creado nigun sendero.</p>
//       )}
//           </Slider>
//           {/* <Slider {...settings}>
//           {userLikedHikings.length > 0 ? (
//         userLikedHikings.map(like => (
//           <FavoriteCard key={like.id} like={like} />
//         ))
//       ) : (
//         <p>Aun no has creado nigun sendero.</p>
//       )}
//           </Slider> */}
//           <div className={style.usercomments}>
          
//           <Slider {...settings2}>
//                       {comments.map((c) => (
//                     <div key={c.id}>
//                         <p>{c.description}</p>
//                         <p>Por userId: {c.userId}</p>
//                     </div>
//                 ))}
//           </Slider>
//           </div>

          
//     </div>

//     </div>
    
//   );
// };

// export default ProfileHikings;
