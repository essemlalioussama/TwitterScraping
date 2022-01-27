import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/tweetRoutes.js"

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/", router);


const PORT = process.env.PORT || 9000;
const HOST = process.env.HOST ;


app.listen(PORT, () => console.log(`Server running on : ${PORT} `));
