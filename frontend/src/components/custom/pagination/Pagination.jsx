import React from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import '../../../styles/Pagination.css';

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const pageNumbers = [];
  
  // Determine which page numbers to show
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, startPage + 2);
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <span onClick={() => paginate(currentPage - 1)}>
          <NavigateBeforeIcon />
        </span>
      )}
      {pageNumbers.map(number => (
        <span
          key={number}
          onClick={() => paginate(number)}
          className={currentPage === number ? 'active' : ''}
        >
          {number}
        </span>
      ))}
      {endPage < totalPages && (
        <span onClick={() => paginate(currentPage + 1)}>
          <NavigateNextIcon />
        </span>
      )}
    </div>
  );
};

export default Pagination;
