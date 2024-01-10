import express from "express";
import { UserModel } from "../models/User";
const leaderboardRouter = express.Router();

leaderboardRouter.get("/", async (req, res) => {
  const users = await UserModel.aggregate([
    {
      $match: {
        community: { $exists: true },
      },
    },
    {
      $lookup: {
        from: "communities",
        localField: "community",
        foreignField: "_id",
        as: "user_community",
      },
    },
    {
      $unwind: "$experiencePoints",
    },
    {
      $group: {
        _id: "$_id",
        totalExperience: { $sum: "$experiencePoints.points" },
        community: { $first: "$community" },
        user_community: { $first: "$user_community" },
      },
    },
    {
      $group: {
        _id: "$community",
        totalExperience: { $sum: "$totalExperience" },
        totalUsers: { $count: {} },
        community: { $first: "$user_community" },
      },
    },
    {
      $sort: {
        totalExperience: -1, //Sort desc
      },
    },
    {
      $limit: 10,
    },
  ]);
  res.send(users);
});

export { leaderboardRouter };
