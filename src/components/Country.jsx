const Country = ({country}) => {
    return ( <div className="country">
        <img className="country-img" src={country.flagUrl} alt="" />
        <div className="country-info">
            <h3>{country.name}</h3>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
        </div>
    </div> );
}
 
export default Country;