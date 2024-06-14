import React, { useState, useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL_2 } from "../../utils/apiURL";
import { debounce } from "lodash";

export default function SearchBar({ setResults, setShowResults }) {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");

  const fetchApi = async (value) => {
    const response = await fetch(`${BASE_URL_2}products`);
    const result = await response.json();
    const resultFinal = result.products.filter((item) => {
      return item.title.toLowerCase().includes(value.toLowerCase());
    });
    setResults(resultFinal);
  };

  const handleSearchKeyword = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchKeyword(value);
    setShowResults(value.length > 0);
    if (value.length > 0) fetchApi(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${searchKeyword}`);
      setShowResults(false);
    }
  };

  return (
    <>
      <input
        type="text"
        className="form-control fs-14"
        placeholder="Tìm kiếm sản phẩm"
        onChange={handleSearchKeyword}
        onKeyDown={handleKeyDown}
        value={searchKeyword}
      />
      <Link
        to={`search/${searchKeyword}`}
        className="text-white search-btn flex align-center justify-center"
      >
        <FaMagnifyingGlass />
      </Link>
    </>
  );
}
