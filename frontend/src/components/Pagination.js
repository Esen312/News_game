// Pagination.js

import React from 'react';
import './Pagination.css'; // Убедитесь, что у вас есть CSS файл с соответствующими стилями

const MAX_PAGES_SHOWN = 7; // Максимальное количество отображаемых номеров страниц

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPages = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(MAX_PAGES_SHOWN / 2));
    const endPage = Math.min(totalPages, startPage + MAX_PAGES_SHOWN - 1);

    if (startPage > 1) {
      pages.push(
        <button key="page_1" onClick={() => onPageChange(1)}>1</button>,
        <span key="ellipsis_start">...</span>
      );
    }

    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <button
          key={`page_${page}`}
          className={currentPage === page ? 'active' : ''}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      );
    }

    if (endPage < totalPages) {
      pages.push(
        <span key="ellipsis_end">...</span>,
        <button key={`page_${totalPages}`} onClick={() => onPageChange(totalPages)}>
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {renderPages()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
