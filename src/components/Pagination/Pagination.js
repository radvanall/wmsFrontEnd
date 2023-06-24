import React from "react";
import "./Pagination.css";
const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const handlePaginate = (page) => {
    if (page < 1 || page > pageNumbers[pageNumbers.length - 1]) return;
    paginate(page);
  };
  return (
    <nav>
      <ul className="pagination">
        <li className="page__number">
          <button
            onClick={() => handlePaginate(currentPage - 1)}
            className="pagination__link"
          >
            &lt;
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className="page__number">
            <button
              onClick={() => paginate(number)}
              className="pagination__link"
            >
              {number}
            </button>
          </li>
        ))}
        <li className="page__number">
          <button
            className="pagination__link"
            onClick={() => handlePaginate(currentPage + 1)}
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
