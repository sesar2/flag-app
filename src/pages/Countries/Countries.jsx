import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlags } from "../../redux/countriesSlice";
import Country from "../../components/Country";
import SearchBar from "../../components/SearchBar";
import "./countries.css";

const Countries = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFlags());
  }, [dispatch]);
  
  const allCountries = useSelector((store) => store.countries.allCountries);
  const regions = ['All', 'Europe', 'Americas', 'Asia', 'Oceania', 'Africa']
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [isOpen, setIsOpen] = useState(false)

  const handleRegionChange = (region) => {
    setSelectedRegion(region)
    setIsOpen(false)
  }
  return (
    <div className="site-wrapper">
      <h1>Browse Countries</h1>
      <div className="filters">
        <SearchBar countries={allCountries}/>
        <div className="select-container">
          <h2 className="select-text">Select Region:</h2>
          <div className="dropdown">
            <div onClick={()=>setIsOpen(!isOpen)} className="select">{selectedRegion} <img className={!isOpen ? "arrow" : "arrow-open" } src="src\assets\chevron-down-svgrepo-com.svg" alt="" /></div>
            <div className="options">
            {regions.map((region, i)=>(
              isOpen && <div key={i} onClick={()=>handleRegionChange(region)} className="region-option">{region}</div>
            ))}
            </div>
          </div>
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
