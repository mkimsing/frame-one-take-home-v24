import express from "express";
import { utilsRouter } from "./utils";
import { userRouter } from "./user";
import { communityRouter } from "./community";
import { leaderboardRouter } from "./leaderboard";

export const apiRouter = express.Router();

apiRouter.use("/community", communityRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/utils", utilsRouter);
apiRouter.use("/leaderboard", leaderboardRouter);
