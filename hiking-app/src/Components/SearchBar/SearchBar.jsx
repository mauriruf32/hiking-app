// SearchBar.jsx
import React, { useState } from "react";
import { useHikings} from "../../Context/HikingContext";
import style from "./SearchBar.module.css"

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { getHikingByName } = useHikings();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    (getHikingByName(e.target.value));
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
