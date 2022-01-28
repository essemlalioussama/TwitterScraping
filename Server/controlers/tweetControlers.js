import axios from "axios";
import dotenv from "dotenv";
import redis from 'redis';

dotenv.config();

const adresseServer = process.env.APITWINT || '127.0.0.1';

const portRedis =process.env.REDIS_PORT || 6379;

const client = redis.createClient(portRedis);

const port = process.env.PORTAPITWINT || 5000;

// cache middlewares

export const cacheTweets = (req,res,next)=>{
  const searchObject = req.body;
  client.get(searchObject.city,(err,data)=>{
    if(err) throw err;
    if(data !== null){
      res.status(200).json(JSON.parse(data));
    }else{
      next();
    }
  })
}

export const tweetNumberCache = (req,res,next)=>{
  const {topic} = req.body;
  client.get(topic,(err,data)=>{
    if(err) throw err;
    if(data !== null){
      res.status(200).json(JSON.parse(data));
    }else{
      next();
    }
  })
}

// Make Request to API TWINT

export const getTweets = async (req,res)=>{
  try {
    let searchObject = req.body;
         await axios.post(`http://${adresseServer}:${port}/tweets`, searchObject)
            .then( result => {

              const data = result.data;

              // store Tweets in Redis
              if(searchObject.city)
                client.setex(searchObject.city, 600,JSON.stringify(data));

              // send a respond
              res.status(200).json(data);
              
            })
            .catch(error => {
                console.error(error)
            });
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
}

// Retrieve number of tweet by city

export const tweetCount = async (req,res)=>{
    try {
    let {topic,cities} = req.body;
     for(const elt of cities) {
         await axios.post(`http://${adresseServer}:${port}/tweets/${elt.city}`, {'topic': topic})
            .then( result => {
                elt["count"]=result.data["count"];
            })
            .catch(error => {
                console.error(error)
            });
        };
      // Store result the search in Redis
        client.setex(topic,600,JSON.stringify(cities));
      // send response 
        await res.status(200).json(cities)
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
}