import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LeaderboardEntry } from "../../interfaces";

export const useLeaderboard = () => {
  const { data: leaderboardData, isLoading: leaderboardLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () =>
      axios
        .get<LeaderboardEntry[]>("http://localhost:8080/leaderboard")
        .then((res) => res.data),
  });

  return {
    leaderboardData,
    leaderboardLoading,
  };
};
