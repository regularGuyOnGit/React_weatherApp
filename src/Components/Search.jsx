import React from "react";
import "../Style/search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faSearch } from "@fortawesome/fontawesome-free-solid";

function Search({ searchInput, setSearchInput, setSearchBtn }) {
  const userInput = (e) => {
    setSearchInput(e.target.value);
  };
  return (
    <div className="inputField">
      <form onSubmit={(e) => e.preventDefault()} onChange={(e) => userInput(e)}>
        <input
          type="search"
          name="userSearch"
          id="userSearch"
          placeholder="Search by city name or by zipcode"
        />
        <button onClick={() => setSearchBtn(searchInput)} type="submit">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </div>
  );
}

export default Search;
