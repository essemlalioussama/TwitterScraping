import express from "express";


import {tweetCount, getTweets,cacheTweets,tweetNumberCache } from "../controlers/tweetControlers.js";

const router = express.Router();

router.post('/tweetsCount',tweetNumberCache,tweetCount);

router.post('/tweets',cacheTweets,getTweets);

export default router;