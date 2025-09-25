import { Link } from "react-router-dom";
import "./Homepage.css";

const Homepage = () => {
  return (
    
      <div className="homepage-container">
        <h1>Flag App</h1>
        <div className="btn-container">
          <Link to="/countries" className="browse-countries link big">
            Browse Countries
          </Link>
          <Link to="/collection" className="collection link big">
            Collection
          </Link>
        </div>
        <div className="btn-container">
          <Link to="/quiz" className="quiz link">
            Country Quiz
          </Link>
          <Link to="/leaderboard" className="leaderboard-btn link">
            Leaderboard
          </Link>
        </div>
      </div>
 
  );
};

export default Homepage;
