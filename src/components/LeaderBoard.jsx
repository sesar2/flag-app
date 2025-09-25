const LeaderBoard = ({ difficulty, region }) => {
  const leaderboardData =
    difficulty === "Hard"
      ? localStorage.getItem("hardLeaderboard")
      : difficulty === "Medium"
      ? localStorage.getItem("mediumLeaderboard")
      : localStorage.getItem("easyLeaderboard");

  const leaderboard = JSON.parse(leaderboardData).filter((score)=> score.region === region) || [];

  return (
    <div className="leaderboard">
      <h2 className="high-score">
        1. {!leaderboard[0]   ? 'No score' : leaderboard[0]?.username}: {leaderboard[0]?.score}{" "}
      </h2>
      <h3>
        2. {!leaderboard[1]   ? 'No score' : leaderboard[1]?.username}: {leaderboard[1]?.score}
      </h3>
      <h3>
        3. {!leaderboard[2]   ? 'No score' : leaderboard[2]?.username}: {leaderboard[2]?.score}
      </h3>
    </div>
  );
};

export default LeaderBoard;
