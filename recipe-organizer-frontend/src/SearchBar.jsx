import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSearch = () => {
    // Trigger the search with the provided callback
    onSearch(searchTerm);
    navigate("/searchresults");
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded-l-md p-2"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;