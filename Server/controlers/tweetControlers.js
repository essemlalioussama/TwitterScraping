import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const adresseServer = process.env.APITWINT || '127.0.0.1';
const port = process.env.PORTAPITWINT || 5000;
export const getTweets = async (req,res)=>{
  try {
    let searchObject = req.body;
         await axios.post(`http://${adresseServer}:${port}/tweets`, searchObject)
            .then( result => {
              res.status(200).json(result.data);
            })
            .catch(error => {
                console.error(error)
            });
      } catch (error) {
        res.status(404).json({
          message: error.message,
        });
      }

}

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
        await res.status(200).json(cities)
      } catch (error) {
        res.status(404).json({
          message: error.message,
        });
      }
}