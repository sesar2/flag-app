import { Link } from "react-router-dom";

const Country = ({country}) => {
    return ( <Link to={`/country/${country.name}`} className="country">
        <img className="country-img" src={country.flagUrl} alt="" />
        <div className="country-card">
            <h3>{country.name}</h3>
            <div className="country-info">
            <p>Region: {country.region}</p>
            <p>Capital: {country.capital}</p>
            <p>Populations: {country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            </div>
        </div>
    </Link> );
}
 
export default Country;