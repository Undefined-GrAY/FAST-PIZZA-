import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchOrder = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-full text-sm px-4 py-2 placeholder:text-stone-400 bg-yellow-100 w-28 sm:w-64 sm:focus:w-72  focus:ring-yellow-500 transition-all duration-300 focus:ring-opacity-50 focus:outline-none"
      />
    </form>
  );
};

export default SearchOrder;
