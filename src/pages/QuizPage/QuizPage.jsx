import { useState, useEffect, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextQuestion, incrementScore, saveScore } from "../../redux/quizSlice";
import "./QuizPage.css";
import SearchBar from "../../components/SearchBar";
import { fetchFlags } from "../../redux/countriesSlice";
const QuizPage = () => {
  const difficulty = useSelector((state) => state.quiz.quizDifficulty);
  const countries = useSelector((state) => state.quiz.quizCountries);
  const questionIndex = useSelector((state) => state.quiz.questionIndex);
  const allCountries = useSelector((state) => state.countries.allCountries);
  const region = useSelector((state) => state.quiz.quizRegion);
  const score = useSelector((state) => state.quiz.score);
  const [randomCountry, setRandomCountry] = useState({});
  const [randomOptions, setRandomOptions] = useState([]);

  console.log(region);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFlags());
  }, [dispatch]);

  useEffect(() => {
    if (!countries.length) return;

    // 1. Pick a random country
    const index = Math.floor(Math.random() * countries.length);
    const chosenCountry = countries[index];
    setRandomCountry(chosenCountry);

    // 2. Pick 3 other random countries (excluding the chosen one)
    const threeRandomCountries = [...countries]
      .filter((c) => c.name !== chosenCountry.name) // exclude correct one
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);

    const fiveRandomCountries = [...countries]
      .filter((c) => c.name !== chosenCountry.name) // exclude correct one
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);

    // 3. Combine + shuffle options
    const optionsObj =
      difficulty === "Easy"
        ? [...threeRandomCountries, chosenCountry].sort(
            () => 0.5 - Math.random()
          )
        : [...fiveRandomCountries, chosenCountry].sort(
            () => 0.5 - Math.random()
          );

    const options = optionsObj.map((country) => country.name);

    setRandomOptions(options);
  }, [countries, questionIndex]);

  const handleAnswer = (country) => {
    if (country === randomCountry.name) {
      dispatch(incrementScore());
    }
    dispatch(nextQuestion());

    if (questionIndex === 15) {
      dispatch(
        saveScore()
      );
    }
  };

  return questionIndex < 16 ? (
    <div className="quiz-page">
      <div className="quiz-header">
        <h2>{score}</h2>
        <h2>{questionIndex}/15</h2>
        <h1>Which country is this?</h1>
      </div>
      <div className="quiz-container">
        <img src={randomCountry.flagUrl} alt="" className="quiz-flag" />
        {difficulty !== "Hard" ? (
          <div className="option-container">
            {randomOptions.map((option, i) => (
              <button
                onClick={() => handleAnswer(option)}
                className="quiz-option"
                key={i}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <SearchBar
            countries={allCountries}
            quiz={true}
            handleAnswer={handleAnswer}
          />
        )}
      </div>
    </div>
  ) : (
    <div className="quiz-page">
      <h1 style={{ marginBottom: "20px" }}>Quiz Completed!</h1>
      <h3>You answered {score} out of 15 possible flags!</h3>
    </div>
  );
};

export default QuizPage;
