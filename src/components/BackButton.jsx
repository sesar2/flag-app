import { Link, useNavigate, useLocation } from "react-router-dom";

const BackButton = ({ defaultUrl = "/" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  

  const handleBack = () => {
    const from = location.state?.from || defaultUrl;
    navigate(from, { replace: true }); // replace prevents history loops
  };
  return (
    <button onClick={handleBack} className="back-button" style={location.pathname === '/' ? {display: 'none'} : {display: 'inline-block'}}>
      Back
    </button>
  );
};

export default BackButton;
