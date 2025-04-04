import { React, useEffect} from 'react';
import { useAuth } from "../../Context/AuthContext";
import { useHikings } from '../../Context/HikingContext';

import style from "./Profile.module.css"; 
import CardProfile from "../../Components/Cards/CardProfile";

const Profile = () => {
 const { user }  = useAuth();
 const { getHikingPlaces, hinkings } = useHikings();

 useEffect(() => {
    getHikingPlaces();
 }, []);

    return (
        <div >
            <div className={style.perfilcontainer}>
                <p>Name: {user.firstName}</p>
                <p>LastName: {user.firstName}</p>
                <p>Email: {user.email}</p>
                <p>Id: {user.id}</p>
            </div>
            <div className={style.cardscontainer}>
                {hinkings?.map((hiking) => (
                <CardProfile hiking={hiking} key={hiking.id}/>
                ))}
            </div>
        </div>
    );
}

export default Profile;
