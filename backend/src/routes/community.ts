import express from "express";
import { CommunityModel } from "../models/Community";

const communityRouter = express.Router();

/**
 * @route GET /community/:id
 * @param {string} id - Community ID
 * @returns {Community} - Community object
 */
communityRouter.get("/:id", async (req, res) => {
	const community = await CommunityModel.findById(req.params.id).lean();
	if (!community) {
		return res.status(404).send({ message: "Community not found" });
	}
	res.send(community);
});

/**
 * @route GET /community
 * @returns {Array} - Array of Community objects
 */
communityRouter.get("/", async (_, res) => {
	const communities = await CommunityModel.find({}).lean();
	res.send(communities);
});

export {
    communityRouter
}
