import LeaderboardItem from "./LeaderboardItem";
import { useLeaderboard } from "./useLeaderboard";
import { FiLoader } from "react-icons/fi";
export default function Leaderboard() {
  const { leaderboardData, leaderboardLoading } = useLeaderboard();

  return (
    <div className="flex flex-col border-2 p-4 rounded-xl mt-5 max-w-screen-md mx-auto">
      <p className="text-2xl font-bold mb-4">
        Community Experience Point Leaders
      </p>
      {Boolean(leaderboardLoading) && <FiLoader size={45} className="m-auto" />}
      {leaderboardData &&
        leaderboardData.map((entry, index) => {
          return (
            <div className="mb-2">
              <LeaderboardItem entry={entry} rank={index + 1} />
            </div>
          );
        })}
    </div>
  );
}
