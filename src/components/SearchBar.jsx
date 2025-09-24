import { useState } from "react";
import { Link } from "react-router-dom";
import "./searchBar.css";

const SearchBar = ({ countries, quiz = false, handleAnswer }) => {
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);
  };
  const filteredCountries = countries.filter((country) => {
    const searchTerm = input.toLowerCase();
    const countryName = country.name.toLowerCase();
    return searchTerm && countryName.startsWith(searchTerm);
  });
  return (
    <div className="input-container">
      <input
        value={input}
        id="search"
        onChange={handleChange}
        type="text"
        placeholder="Search for a country..."
      />
      {input !== "" && (
        <div className="search-results-dropdown">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country, i) =>
              !quiz ? (
                <Link
                  key={i}
                  style={{ textDecoration: "none" }}
                  to={`/country/${country.name}`}
                  state={{ from: `/countries` }}
                >
                  <div className="search-result-item">
                    <img
                      className="country-flag-small"
                      src={country.flagUrl}
                      alt=""
                    />

                    <p>{country.name}</p>
                  </div>
                </Link>
              ) : (
                <div key={i} onClick={()=>{handleAnswer(country.name), setInput('')}} className="search-result-item">
                  <p>{country.name}</p>
                </div>
              )
            )
          ) : (
            <div className="search-result-item">No matches found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
