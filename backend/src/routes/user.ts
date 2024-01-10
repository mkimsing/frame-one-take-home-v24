import express from "express";
import { UserModel } from "../models/User";
import { CommunityModel } from "../models/Community";

const userRouter = express.Router();

/**
 * @route GET /user/:id
 * @param {string} id - User ID
 * @returns {User} - User object with experiencePoints field
 */
userRouter.get("/:id", async (req, res) => {
  const user = await UserModel.findById(req.params.id).select(
    "+experiencePoints"
  );
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  res.send(user);
});

/**
 * @route GET /user
 * @returns {Array} - Array of User objects
 * @note Adds the virtual field of totalExperience to the user.
 * @hint You might want to use a similar aggregate in your leaderboard code.
 */
userRouter.get("/", async (_, res) => {
  const users = await UserModel.aggregate([
    {
      $unwind: "$experiencePoints",
    },
    {
      $group: {
        _id: "$_id",
        email: { $first: "$email" },
        profilePicture: { $first: "$profilePicture" },
        totalExperience: { $sum: "$experiencePoints.points" },
      },
    },
  ]);
  res.send(users);
});

/**
 * @route POST /user/:userId/join/:communityId
 * @param {string} userId - User ID
 * @param {string} communityId - Community ID
 * @description Joins a community
 */
userRouter.post("/:userId/join/:communityId", async (req, res) => {
  const { userId, communityId } = req.params;
  // TODO: Implement the functionality to join a community

  const user = await UserModel.findById(userId);
  const community = await CommunityModel.findById(communityId);

  if (!user || !community) {
    return res.status(404).send({
      message: `Unable to find UserId ${userId} or CommunityId ${communityId}`,
    });
  }

  //Users must not be part of a community already
  if (user.community) {
    return res.status(422).send({
      message:
        "User is already part of a community. Users can only be part of one community. Please leave this community and try again",
    });
  } else {
    user.community = community._id;
    user.save();
    return res.status(200).send();
  }
});

/**
 * @route DELETE /user/:userId/leave/:communityId
 * @param {string} userId - User ID
 * @param {string} communityId - Community ID
 * @description leaves a community
 */
userRouter.delete("/:userId/leave/:communityId", async (req, res) => {
  const { userId, communityId } = req.params;
  // TODO: Implement the functionality to leave a community
  const user = await UserModel.findById(userId).populate("community").exec();
  const community = await CommunityModel.findById(communityId);
  if (!user || !community) {
    return res.status(404).send({
      message: `Unable to find UserId ${userId} or CommunityId ${communityId}`,
    });
  }

  //Ensure user is part of specified community
  if (String(community._id) !== String(user.community?._id)) {
    return res.status(400).send({
      message: `User is not part of community ${community._id}`,
    });
  } else {
    user.community = undefined;
    user.save();
    return res.status(200).send();
  }
});

export { userRouter };
