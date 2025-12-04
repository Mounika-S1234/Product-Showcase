import React from 'react';
import '../styles/ProductList.css'; // Uses existing pagination styling

/**
 * Reusable pagination component.
 * @param {number} currentPage - The current page number.
 * @param {number} totalPages - The total number of available pages.
 * @param {function} onPageChange - Callback function to handle page change.
 */
function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) {
        return null;
    }

    const goToPrevious = () => {
        onPageChange(Math.max(currentPage - 1, 1));
    };

    const goToNext = () => {
        onPageChange(Math.min(currentPage + 1, totalPages));
    };

    return (
        <div className="pagination" role="navigation" aria-label="Pagination Navigation">
            <button 
                onClick={goToPrevious} 
                disabled={currentPage === 1}
                aria-label="Go to previous page"
            >
                &laquo; Previous
            </button>
            
            <span>Page **{currentPage}** of **{totalPages}**</span>
            
            <button 
                onClick={goToNext} 
                disabled={currentPage === totalPages}
                aria-label="Go to next page"
            >
                Next &raquo;
            </button>
        </div>
    );
}

export default Pagination;