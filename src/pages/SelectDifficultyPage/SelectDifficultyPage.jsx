import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDifficulty,
  startQuiz,
  setUsername,
  setCountries,
  setQuizRegion,
} from "../../redux/quizSlice";
import { fetchFlags } from "../../redux/countriesSlice";
import { useEffect } from "react";
import "./SelectDifficultyPage.css";
import Dropdown from "../../components/Dropdown";

const SelectDifficultyPage = () => {
  const difficulties = ["Easy", "Medium", "Hard"];
  const regions = ["All", "Europe", "Americas", "Asia", "Oceania", "Africa"];

  const [selectedDifficulty, setSelectedDifficulty] = useState(difficulties[0]);
  const [region, setRegion] = useState("All");
  const [input, setInput] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFlags()).finally(() => setLoading(false));
  }, [dispatch]);
  const allCountries = useSelector((store) => store.countries.allCountries);

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setOpenDropdown(null);
  };

  const handleRegionChange = (region) => {
    setRegion(region);
    setOpenDropdown(null);
};

  const handleStartQuiz = () => {
    if (input.trim() === "") {
      alert("Please enter a username");
      return;
    }
    const quizCountries = allCountries.filter((country) => country.region === region || region === 'All');
    dispatch(setCountries(quizCountries));
    dispatch(setDifficulty(selectedDifficulty));
    dispatch(setUsername(input));
    dispatch(setQuizRegion(region))
    dispatch(startQuiz());
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="select-difficulty-page">
      <div className="input-wrapper">
        <div className="input-container-quiz">
          <h1>Select Difficulty</h1>
          <Dropdown
            options={difficulties}
            setState={handleDifficultyChange}
            state={selectedDifficulty}
            isOpen={openDropdown === "difficulty"}
            setIsOpen={() =>
              setOpenDropdown(
                openDropdown === "difficulty" ? null : "difficulty"
              )
            }
            page="quiz"
          />
        </div>
        <div className="input-container-quiz">
          <h1>Select Region</h1>
          <Dropdown
            options={regions}
            setState={handleRegionChange}
            state={region}
            isOpen={openDropdown === "region"}
            setIsOpen={() =>
              setOpenDropdown(openDropdown === "region" ? null : "region")
            }
            page="quiz"
          />
        </div>
        <div className="input-container-quiz">
          <h1>Write Username</h1>
          <input
            placeholder="Write Username..."
            onChange={handleChange}
            type="text"
            className="username-input"
            value={input}
          />
        </div>
      </div>
      <button className="start-quiz-btn" onClick={handleStartQuiz}>
        START QUIZ
      </button>
    </div>
  );
};

export default SelectDifficultyPage;
