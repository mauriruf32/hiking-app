import React from 'react'
import style from "./NavBar.module.css"
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

function NavBar() {
  
  const { isAuthenticated, logout } = useAuth();


  return (
    <nav className={style.container}>
      <Link to="/home">
      <h1>Hikings Manager</h1>
      </Link>
      <ul className={style.lista}>
      {isAuthenticated ? (
        <>
        <li>
          Welcome User
        </li>
        <li>
          <Link to="/hikingform">Add Hiking Place</Link>
        </li>
        <li>
          <Link to="/" onClick={()=>{
            logout()
          }}>LogOut</Link>
        </li>
        </>
      ) : (
        <>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        </>
      )}

      </ul>
    </nav>
  )
}

export default NavBar;