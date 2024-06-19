import React, { useState, useEffect } from "react";
import "../../styles/pagination.css";

const Pagination = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [startPage, setStartPage] = useState(1);

  useEffect(() => {
    setStartPage(Math.max(1, Math.floor((currentPage - 1) / 3) * 3 + 1));
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    if (startPage > 1) {
      pageButtons.push(
        <button
          key="prev"
          onClick={() => handlePageChange(startPage - 1)}
          className="chevron"
        >
          &lt;
        </button>
      );
    }

    for (let i = startPage; i <= Math.min(startPage + 2, totalPages); i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }

    if (startPage + 2 < totalPages) {
      pageButtons.push(
        <button
          key="next"
          onClick={() => handlePageChange(startPage + 3)}
          className="chevron"
        >
          &gt;
        </button>
      );
    }

    return pageButtons;
  };

  return <div className="pagination">{renderPageButtons()}</div>;
};

export default Pagination;
