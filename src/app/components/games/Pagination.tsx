'use client';

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Calculate the range of pages to display
  const getPageNumbers = () => {
    const range = [];
    const maxPagesToShow = 5;
    const sidePages = Math.floor(maxPagesToShow / 2);
    
    let startPage = Math.max(1, currentPage - sidePages);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }
    
    return range;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center mt-8">
      <nav className="flex items-center space-x-1">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded ${
            currentPage === 1
              ? 'border-[var(--color-border)] text-gray-400 cursor-not-allowed'
              : 'border-[var(--color-border)] hover:bg-[var(--color-secondary)] text-[var(--color-text)]'
          }`}
        >
          &laquo;
        </button>
        
        {/* First page if not in view */}
        {getPageNumbers()[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-4 py-2 border border-[var(--color-border)] hover:bg-[var(--color-secondary)] text-[var(--color-text)]"
            >
              1
            </button>
            {getPageNumbers()[0] > 2 && (
              <span className="px-4 py-2 text-[var(--color-text)]">...</span>
            )}
          </>
        )}
        
        {/* Page numbers */}
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 border ${
              currentPage === page
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
                : 'border-[var(--color-border)] hover:bg-[var(--color-secondary)] text-[var(--color-text)]'
            }`}
          >
            {page}
          </button>
        ))}
        
        {/* Last page if not in view */}
        {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
          <>
            {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
              <span className="px-4 py-2 text-[var(--color-text)]">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-4 py-2 border border-[var(--color-border)] hover:bg-[var(--color-secondary)] text-[var(--color-text)]"
            >
              {totalPages}
            </button>
          </>
        )}
        
        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded ${
            currentPage === totalPages
              ? 'border-[var(--color-border)] text-gray-400 cursor-not-allowed'
              : 'border-[var(--color-border)] hover:bg-[var(--color-secondary)] text-[var(--color-text)]'
          }`}
        >
          &raquo;
        </button>
      </nav>
    </div>
  );
}