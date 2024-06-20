// SearchBar.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getHikingPlaceByName, getHikingPlaceByContinente, getHikingPlaceByPais } from "../../redux/actions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    dispatch(getHikingPlaceByName(e.target.value));
    // dispatch(getHikingPlaceByContinente(e.target.value));
    // dispatch(getHikingPlaceByPais(e.target.value));
  };

  return (
    <input
      type="text"
      placeholder="Buscar sendero"
      value={searchTerm}
      onChange={handleInputChange}
    />
  );
};

export default SearchBar;
