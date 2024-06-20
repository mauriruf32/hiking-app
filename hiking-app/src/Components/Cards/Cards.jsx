// Cards.jsx
import React, { useState } from "react";
import Card from "../Card/Card";
import style from "./Cards.module.css";

const Cards = ({ hikingPlaces }) => {
  const cardsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  const paginatedHikingPlaces = hikingPlaces.slice(startIndex, endIndex);

  const totalPages = Math.ceil(hikingPlaces.length / cardsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pagesToShow = [];
    const range = 2;

    for (let i = Math.max(1, currentPage - range); i <= Math.min(totalPages, currentPage + range); i++) {
      pagesToShow.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${style.pageButton} ${i === currentPage ? style.active : ""}`}
        >
          {i}
        </button>
      );
    }

    return pagesToShow;
  };

  return (
    <div>
      <div className={style.container}>
        {paginatedHikingPlaces.map((hikingPlace) => (
          <Card key={hikingPlace.id} hikingPlace={hikingPlace} />
        ))}
      </div>
      <div className={style.pagination}>
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)} className={style.pageButton}>
            {"<"}
          </button>
        )}
        {renderPagination()}
        {currentPage < totalPages && (
          <button onClick={() => handlePageChange(currentPage + 1)} className={style.pageButton}>
            {">"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Cards;
