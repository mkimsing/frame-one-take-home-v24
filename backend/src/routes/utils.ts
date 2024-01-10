import express from "express";
import { UserModel } from '../models/User';
import { CommunityModel } from '../models/Community';
import crypto from 'crypto';

const utilsRouter = express.Router();

/**
 * @route GET /utils/health
 * @returns {number} - Status code
 */
utilsRouter.get("/health", (_, res) => {
    res.sendStatus(200);
})

/**
 * @route GET /utils/inflate-db
 * @description This route is used to inflate the database with dummy data. It creates USERS_COUNT users and COMMUNITIES_COUNT communities.
 * If the database already contains USERS_COUNT users and COMMUNITIES_COUNT communities, it will return a 400 status code with a message.
 * Otherwise, it will create the users and communities and return a 200 status code.
 * @returns {number} - Status code
 */
utilsRouter.get("/inflate-db", async (_, res) => {
    try {
        const USERS_COUNT = 100;
        const COMMUNITIES_COUNT = 10;

        const userCount = await UserModel.countDocuments({});
        const communityCount = await CommunityModel.countDocuments({});

        if (userCount >= USERS_COUNT && communityCount >= COMMUNITIES_COUNT) {
            res.status(400).send('Database is already inflated. Please drop the database if you want to regenerate.');
            return;
        }

        const now = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(now.getFullYear() - 1);

        for (let i = 0; i < USERS_COUNT; i++) {
            const experiencePoints = [];
            const numberOfEntries = Math.floor(Math.random() * 101);

            for (let j = 0; j < numberOfEntries; j++) {
                const randomDate = new Date(oneYearAgo.getTime() + Math.random() * (now.getTime() - oneYearAgo.getTime()));
                const randomPoints = Math.floor(Math.random() * 101);
                experiencePoints.push({points: randomPoints, timestamp: randomDate});
            }

            const user = new UserModel({
                email: `user${i}@example.com`,
                passwordHash: crypto.createHash('sha256').update(`qwerty${i}`).digest('hex'),
                profilePicture: `https://picsum.photos/200?random=${i}`,
                experiencePoints: experiencePoints
            });
            await user.save();
        }

        for (let i = 0; i < COMMUNITIES_COUNT; i++) {
            const community = new CommunityModel({
                name: `Community ${i}`,
                logo: `https://picsum.photos/200?random=${i+USERS_COUNT}`,
            });
            await community.save();
        }

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

/**
 * @route GET /utils/drop-db
 * @description Deletes all users and communities from the database
 */
utilsRouter.get("/drop-db", async (_, res) => {
    try {
        await UserModel.deleteMany({});
        await CommunityModel.deleteMany({});
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});


export {
    utilsRouter
};