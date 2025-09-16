import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleCountry } from "../../redux/countriesSlice";
import { useEffect } from "react";

const CountryPage = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const country = useSelector((state) => state.countries.singleCountry);

  useEffect(() => {
    if (name) {
      dispatch(fetchSingleCountry(name));
    }
  }, [dispatch, name]);

  

  return (
    <div>
      <h1>{country.name}</h1>
    </div>
  );
};

export default CountryPage;
