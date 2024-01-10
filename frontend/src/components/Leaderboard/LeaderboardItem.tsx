import React from "react";
import { FaTrophy } from "react-icons/fa";
import { LeaderboardEntry } from "../../interfaces";

type Props = {
  entry: LeaderboardEntry;
  rank: number;
};

export default function LeaderboardItem({ entry, rank }: Props) {
  const { totalExperience, totalUsers, community } = entry;
  const { name, logo } = community[0];
  return (
    <div className="flex items-center">
      <img src={logo} alt="Community logo" className="rounded-full w-20 h-20" />
      <div className="ml-5">
        <div>{name}</div>
        <div>{`${totalUsers} Users`}</div>
      </div>
      <div className="mr-auto ml-auto">{`${totalExperience} EXP Points`}</div>
      <div className="flex flex-col items-center justify-center">
        <div>{`Rank ${rank}`}</div>
        <FaTrophy />
      </div>
    </div>
  );
}
