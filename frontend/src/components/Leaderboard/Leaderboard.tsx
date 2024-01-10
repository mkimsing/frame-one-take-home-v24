import LeaderboardItem from "./LeaderboardItem";
import { useLeaderboard } from "./useLeaderboard";

export default function Leaderboard() {
  const { leaderboardData } = useLeaderboard();

  return (
    <div>
      <div>Community Experience Point Leaders</div>
      {leaderboardData &&
        leaderboardData.map((entry, index) => {
          return (
            <div className="mb-4">
              <LeaderboardItem entry={entry} rank={index + 1} />
            </div>
          );
        })}
    </div>
  );
}
