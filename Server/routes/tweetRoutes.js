import express from "express";


import {tweetCount, getTweets } from "../controlers/tweetControlers.js";

const router = express.Router();

router.post('/tweetsCount',tweetCount);

router.post('/tweets',getTweets);

export default router;