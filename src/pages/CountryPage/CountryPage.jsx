import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  fetchSingleCountry,
  addToCollection,
} from "../../redux/countriesSlice";
import { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import "./CountryPage.css";

const CountryPage = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const country = useSelector((state) => state.countries.singleCountry);
  const collection = useSelector((state) => state.countries.collection);
  console.log(collection);
  const languageNames = country.languages
    ? Object.values(country.languages)
    : [];
  const currencies = country.currencies
    ? Object.values(country.currencies)
    : [];

  useEffect(() => {
    if (name) {
      dispatch(fetchSingleCountry(name));
    }
  }, [dispatch, name]);

  const handleAddToCollection = () => {
    if (!collection.find((c) => c.name === country.name)) {
      dispatch(addToCollection(country));
      localStorage.setItem(
        "collection",
        JSON.stringify([...collection, country])
      );
    }
  };

  return (
    <div className="country-page">
      <img className="country-img" src={country.flagUrl} alt="" />
      <div className="country-card-single">
        <h1>{country.name}</h1>
        <div className="single-country-info">
          <p className="country-info-text">
            Capital:{" "}
            <span className="country-info-value">{country.capital}</span>
          </p>
          <p className="country-info-text">
            Population:{" "}
            <span className="country-info-value">
              {country.population
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
          </p>
          <p className="country-info-text">
            {languageNames.length > 1 ? "Languages:" : "Language:"}
            {languageNames.map((language, index) => (
              <span key={index} className="country-info-value">
                {language}
              </span>
            ))}
          </p>
          <p className="country-info-text">
            Region: <span className="country-info-value">{country.region}</span>
          </p>
          <p className="country-info-text">
            {currencies.length === 1 ? (
              <>
                Currency:{" "}
                <span className="country-info-value">{currencies[0].name}</span>
              </>
            ) : (
              <>
                Currencies:{" "}
                {currencies.map((currency, index) => (
                  <span key={index} className="country-info-value">
                    {currency.name}
                    {index < currencies.length - 1 ? ", " : ""}
                  </span>
                ))}
              </>
            )}
          </p>
        </div>
        <div className="button-container">
          <button onClick={handleAddToCollection} className="add-button">
            Add to Collection
          </button>
          Or
          <Link
            state={{ from: `/countries` }}
            to={"/collection"}
            className="view-collection-button"
          >
            View collection
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CountryPage;
