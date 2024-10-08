import React, { useState, useEffect } from 'react';
// Component
import { useStateContext } from '../../contexts/ContextProvider';
import { Input, DeleteModal } from "../index"
import { API_ENDPOINT } from '../../constant/constant';
import { config  } from "../../utils/bankRole"

// Library
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

// CSS File
import "./Table.css";

const Table = ({ columns, data, itemsPerPage = 5, bankTable }) => {
  const { currentColor } = useStateContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data); // New state for filtered data
  const [filterOption, setFilterOption] = useState(''); // State for filtering options
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bankToDelete, setBankToDelete] = useState(null);


  // Calculate total pages based on items per page
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Effect to filter data based on the search query
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = data.filter((item) =>
      columns.some((col) => String(item[col.key]).toLowerCase().includes(lowerCaseQuery))
    );
    setFilteredData(filtered);
  }, [searchQuery, data, columns]);

  // Effect to paginate data when current page or filtered data changes
  useEffect(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    setPaginatedData(filteredData.slice(startIdx, endIdx));
  }, [currentPage, filteredData]);

  // Function to handle next and previous page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Function to handle the filtering option
  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
    if (e.target.value === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) => item.status === e.target.value);
      setFilteredData(filtered);
      setCurrentPage(1); // Reset to page 1 after filtering
    }
  };

  // Pagination Button Component
  const PaginationButton = ({ pageNum }) => (
    <button
      onClick={() => setCurrentPage(pageNum)}
      className={`py-1 px-3 rounded mx-1 ${currentPage === pageNum ? 'text-white' : 'bg-gray-200'}`}
      style={{
        backgroundColor: currentPage === pageNum ? currentColor : undefined, // Use currentColor if it's the current page
      }}
    >
      {pageNum}
    </button>
  );


  const handleDeleteClick = (bank) => {
    setBankToDelete(bank); // Store the selected bank
    setIsDeleteModalOpen(true); // Open the delete confirmation modal
  };

  const handleDeleteConfirm = () => {

    axios.delete(`${API_ENDPOINT}/delete-bank/${bankToDelete}`, config)
      .then((response) => {
      })
      .catch((e) => {
        console.log(e)
      })

    setIsDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false); // Close the modal without deleting
  };

  return (
    <>
      {/* Search Bar and Filter */}
      <div className="mb-4 flex justify-between items-center">
        {/* Search Input */}
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search here"
          className="px-4 py-2 border rounded-lg shadow-sm"
        />
        {bankTable && (
          <select
            value={filterOption}
            onChange={handleFilterChange}
            className="px-4 py-2 border rounded-lg shadow-sm select-option"
          >
            <option value="">Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
          </select>
        )}
      </div>


      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              {/* Conditionally Add Logo Column */}
              {bankTable && (
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600 uppercase">
                  Logo
                </th>
              )}
              {columns.map((col) => (
                <th key={col} className="py-2 px-4 text-left text-sm font-semibold text-gray-600 uppercase">
                  {col.header}
                </th>
              ))}
              {/* Conditionally Add Action Column */}
              {bankTable && (
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600 uppercase">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, idx) => (
              <tr key={idx}>
                {/* Conditionally Render Logo */}
                {bankTable && (
                  <td className="py-2 px-4 border-t text-sm text-gray-700">
                    <img
                      src={row.bankLogo} // Assuming row contains a 'logo' property with the image URL
                      alt="logo"
                      className="w-12 h-12 object-cover rounded-lg" // Logo with border-radius 8px
                    />
                  </td>
                )}

                {columns.map((col, idx) => (
                  <td key={idx} className="py-2 px-4 border-t text-sm text-gray-700">
                    {col.key === 'status' ? (
                      <span
                        className="px-4 py-2 rounded-full"
                        style={{
                          backgroundColor: currentColor,
                          borderRadius: '10px',
                          padding: '0.5rem 1rem',
                          color: 'white',
                        }}
                      >
                        {row[col.key]}
                      </span>
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}

                {/* Conditionally Add Edit and Delete Icons */}
                {bankTable && (
                  <td className="py-2 px-4 text-sm flex space-x-4 items-center justify-center text-center">
                    <Link to={row?._id} className="text-blue-500 hover:text-blue-700">
                      <FaEdit />
                    </Link>
                    <button className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteClick(row?._id)}>
                      <FaTrash />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-between items-center">
          {/* Previous Button */}
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`py-2 px-4 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'text-white'}`}
            style={{
              backgroundColor: currentPage === 1 ? '#D1D5DB' : currentColor, // Set default 'bg-gray-300' for disabled
            }}
          >
            Previous
          </button>

          {/* Page Numbers */}
          <div>
            {Array.from({ length: totalPages }, (_, idx) => (
              <PaginationButton key={idx + 1} pageNum={idx + 1} />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`py-2 px-4 rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'text-white'}`}
            style={{
              backgroundColor: currentPage === totalPages ? '#D1D5DB' : currentColor, // Set default 'bg-gray-300' for disabled
            }}
          >
            Next
          </button>
        </div>
      </div>

      {isDeleteModalOpen && (
        <DeleteModal
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </>
  );
};

export default Table;



/**
 * 
 *   className={`py-2 px-4 rounded cursor-pointer ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : ' bg-black text-[#fff]'} table-icon`}
  style={{ pointerEvents: currentPage === totalPages ? 'none' : 'auto' }}
 */