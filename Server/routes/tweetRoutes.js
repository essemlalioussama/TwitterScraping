import express from "express";


import {tweetCount, getTweets,cacheTweets,tweetNumberCache } from "../controlers/tweetControlers.js";

const router = express.Router();

router.get('/tweetsCount',tweetNumberCache,tweetCount);

router.get('/tweets/:city',cacheTweets,getTweets);

export default router;