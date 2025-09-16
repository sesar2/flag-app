import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlags } from "../../redux/countriesSlice";
import Country from "../../components/Country";
import "./countries.css";

const Countries = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFlags());
  }, [dispatch]);

  const allCountries = useSelector((store) => store.countries.allCountries);

  console.log(allCountries);

  return (
    <div className="site-wrapper">
      <h1>Browse Countries</h1>
      <div className="filters">
        <div className="input-container">
          <input className="country-search" placeholder="Search Country..." type="text" name="" id="" />
          <div className="dropdown"></div>
        </div>
        <div className="select-container">
          <h2>Select Region:</h2>
          <select name="region" id="">
            <option selected value="all">
              All
            </option>
            <option value="europe">Europe</option>
            <option value="americas">Americas</option>
            <option value="asia">Asia</option>
            <option value="oceania">Oceania</option>
            <option value="Africa">Africa</option>
          </select>
        </div>
      </div>
      <div className="countries-container">
        {allCountries.map((country, i) => (
          <Country key={i} country={country} />
        ))}
      </div>
    </div>
  );
};

export default Countries;
