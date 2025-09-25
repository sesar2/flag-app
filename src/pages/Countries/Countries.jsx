import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlags } from "../../redux/countriesSlice";
import Country from "../../components/Country";
import SearchBar from "../../components/SearchBar";
import BackButton from "../../components/BackButton";
import "./countries.css";
import Dropdown from "../../components/Dropdown";

const Countries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const allCountries = useSelector((store) => store.countries.allCountries);
  const regions = ["All", "Europe", "Americas", "Asia", "Oceania", "Africa"];
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchFlags()).finally(() => setLoading(false));
  }, [dispatch]);

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    setIsOpen(false);
  };
  return (
    <>
      <h1>Browse Countries</h1>
      <div className="filters">
        <SearchBar countries={allCountries} />
        <div className="select-container">
          <h2 className="select-text">Select Region:</h2>
          <Dropdown
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            options={regions}
            setState={handleRegionChange}
            state={selectedRegion}
            page={"countries"}
          />
        </div>
      </div>
      <div className="countries-wrapper">
        <div className="countries-container">
          {loading && <h1>loading</h1>}
          {allCountries
            .filter(
              (country) =>
                country.region === selectedRegion || selectedRegion === "All"
            )
            .map((country, i) => (
              <Country key={i} country={country} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Countries;
