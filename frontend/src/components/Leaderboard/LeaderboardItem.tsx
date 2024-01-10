import React from "react";
import { FaTrophy } from "react-icons/fa";
import { LeaderboardEntry } from "../../interfaces";

type Props = {
  entry: LeaderboardEntry;
  rank: number;
};

function createTrophy(rank: number) {
  let color = "#cd7f32";
  switch (rank) {
    case 2:
      color = "#c0c0c0";
      break;
    case 1:
      color = "#d4af37";
      break;
    default:
      color = "#cd7f32";
      break;
  }
  return (
    <div className="p-4 bg-gray-50 rounded-full">
      <FaTrophy size={30} fill={color} />
    </div>
  );
}

export default function LeaderboardItem({ entry, rank }: Props) {
  const { totalExperience, totalUsers, community } = entry;
  const { name, logo } = community[0];

  const bgColors: { [key: number]: string } = {
    1: "#b2d8d8",
    2: "#d8b2d8",
    3: "#f4a460",
  };
  return (
    <div
      className="flex items-center bg-red-200 p-4 rounded-lg"
      style={{
        backgroundColor: bgColors[rank] || "#efeff2",
      }}
    >
      <img src={logo} alt="Community logo" className="rounded-full w-20 h-20" />
      <div className="ml-5">
        <div className="text-lg font-bold">{name}</div>
        <div className="text-gray-600 text-md">{`${totalUsers} members`}</div>
      </div>
      <div className="mr-auto ml-auto text-lg font-bold flex-1">
        <div>{`${totalExperience} pts`}</div>
      </div>
      <div className="w-16 flex items-center justify-center">
        {rank <= 3 ? (
          createTrophy(rank)
        ) : (
          <div className="text-xl font-bold">{`${rank}`}</div>
        )}
      </div>
    </div>
  );
}
