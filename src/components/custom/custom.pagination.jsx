import React, { useState } from "react";
import "../../styles/pagination.css";

const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setStartPage(Math.max(1, Math.floor((page - 1) / 3) * 3 + 1));
      onPageChange(page);
    }
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    if (startPage > 1) {
      pageButtons.push(
        <button key="prev" onClick={handlePreviousPage} className="chevron">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
      );
    }

    for (let i = startPage; i <= Math.min(startPage + 2, totalPages); i++) {
      pageButtons.push(
        <button
          id="btn"
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }

    if (startPage + 3 <= totalPages) {
      pageButtons.push(
        <button
          id="btn"
          key="next"
          onClick={handleNextPage}
          className="chevron"
        >
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      );
    }

    return pageButtons;
  };

  const handlePreviousPage = () => {
    handlePageChange(currentPage - 3);
  };

  const handleNextPage = () => {
    handlePageChange(currentPage + 1, 3);
  };

  return <div className="pagination">{renderPageButtons()}</div>;
};

export default Pagination;
