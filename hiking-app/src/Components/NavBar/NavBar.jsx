import React from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";


const NavBar = () => {
    return (
        <div className={style.container}>
            <div>
            <Link to="/home">HOME</Link>
            {/* <Link to="/create">FORM</Link>
            <Link to="/activities">ACTIVITIES</Link>
            <Link to="/about">ABOUT</Link> */}
            </div>

            
        </div>
    );
};

export default NavBar;
