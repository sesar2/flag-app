import LeaderBoard from "../../components/LeaderBoard";
import './leaderboard.css'
const LeaderBoardPage = () => {
  const regions = ["All", "Europe", "Americas", "Asia", "Oceania", "Africa"];

  return (
    <div className="leaderboardpage">
      {regions.map((region, i) => (
        <div className="leaderboard-container">
          <h1>{region}</h1>
          <div className="difficulty-leaderboard">
            <h1>Hard</h1>
            <LeaderBoard difficulty={"Hard"} region={region} />
          </div>
          <div className="difficulty-leaderboard">
            <h1>Medium</h1>
            <LeaderBoard difficulty={"Medium"} region={region} />
          </div>
          <div className="difficulty-leaderboard">
            <h1>Easy</h1>
            <LeaderBoard difficulty={"Easy"} region={region} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaderBoardPage;
