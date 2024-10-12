// SearchBar.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getHikingPlaceByName, getHikingPlaceByContinente, getHikingPlaceByPais } from "../../redux/actions";
import style from "./SearchBar.module.css"

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    dispatch(getHikingPlaceByName(e.target.value));
    dispatch(getHikingPlaceByContinente(e.target.value));
    dispatch(getHikingPlaceByPais(e.target.value));
  };

  return (
    <div className={style.searchBar}>
    <input
      type="text"
      placeholder="Puedes buscar por el nombre del Sendero"
      value={searchTerm}
      onChange={handleInputChange}
    />
    </div>

  );
};

export default SearchBar;
