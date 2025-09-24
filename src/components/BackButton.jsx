import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { resetQuiz } from "../redux/quizSlice";

const BackButton = ({ defaultUrl = "/" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()

  const handleBack = () => {
    const from = location.state?.from || defaultUrl;
    dispatch(resetQuiz())
    navigate(from, { replace: true }); // replace prevents history loops
  };
  return (
    <button onClick={handleBack} className="back-button" style={location.pathname === '/' ? {display: 'none'} : {display: 'inline-block'}}>
      Back
    </button>
  );
};

export default BackButton;
