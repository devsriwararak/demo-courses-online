"use client"; // This ensures the component is client-side

import React from "react";
import { useRouter } from "next/navigation";

interface PaginationSelectProps {
  totalPages: number;
  currentPage: number;
}

const PaginationSelect: React.FC<PaginationSelectProps> = ({
  totalPages,
  currentPage,
}) => {
  const router = useRouter();

  // Handle the page change by navigating to the new page
  const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPage = parseInt(event.target.value, 10);
    router.push(`?page=${newPage}`);
  };

  return (
    <select
      className="w-full p-2 mb-4 border rounded-md"
      value={currentPage}
      onChange={handlePageChange}
    >
      {Array.from({ length: totalPages }, (_, index) => (
        <option key={index + 1} value={index + 1}>
          หน้า {index + 1}
        </option>
      ))}
    </select>
  );
};

export default PaginationSelect;
