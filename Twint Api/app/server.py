from random import randint
from flask import Flask, jsonify, request
import twint
from twint.tweet import Tweet

app = Flask(__name__)
app.config["DEBUG"]=True
app.config['JSON_AS_ASCII'] = False


@app.route('/tweets/<city>',methods=['POST'])
def api_count_tweet(city):
    request_data = request.get_json()
    twint.output.tweets_list.clear()
    c = twint.Config()
    if 'topic' in request_data:
        c.Search=str(request_data['topic'])
    else:
        return jsonify({"Error" : "no topic field provided. please specify a one"})
    if city :
        c.Near=str(city)
    else:
        return jsonify({"Error" : "no city field provided. please specify a one"})
    if 'lang' in request_data:
        c.Lang=str(request_data['lang'])
    if 'username' in request_data:
        c.Username = str(request_data['username'])
    if 'geo' in request_data:
        c.Geo=str(request_data['geo'])
    #Config Object 
    c.Limit=50
    c.Store_object= True
    c.Show_hashtags = False
    c.Hide_output=True
    # Search
    twint.run.Search(c)
    count = len(twint.output.tweets_list) if len(twint.output.tweets_list) <= 20 else randint(20,50)
    return jsonify({'count': count })
# example data : 
#   {
#   "topic":"ziyech",
#   "city":"rabat",
#   "limit":40
#   }
@app.route('/tweets',methods=['POST'])
def api_topic():
    request_data = request.get_json()
    twint.output.tweets_list.clear()
    c = twint.Config()
    if 'topic' in request_data:
        c.Search=str(request_data['topic'])
    else:
        return jsonify({"Error" : "no topic field provided. please specify a one"})
    if 'city' in request_data:
        c.Near=str(request_data['city'])
    if 'limit' in request_data :
        c.Limit=int(request_data['limit'])
    if 'lang' in request_data:
        c.Lang=str(request_data['lang'])
    if 'username' in request_data:
        c.Username = str(request_data['username'])
    if 'geo' in request_data:
        c.Geo=str(request_data['geo'])
    #Config Object
    c.Limit=80 
    c.Store_object= True
    c.Show_hashtags = False
    c.Hide_output=True
    # Search
    twint.run.Search(c)
    tweets=[]
    # Retrieve Tweets
    for tweet in twint.output.tweets_list:
        tweets.append({
            'id':tweet.id,
            'conversation_id':tweet.conversation_id,
            'datestamp':tweet.datestamp,
            'timestamp':tweet.timestamp,
            'timezone':tweet.timezone,
            'user_id':tweet.user_id,
            'name':tweet.name,
            'username':tweet.username,
            'place':tweet.place,
            'tweet':tweet.tweet,
            'mentions':tweet.mentions,
            'urls':tweet.urls,
            'photos':tweet.photos,
            'replies_count':tweet.replies_count,
            'retweets_count':tweet.retweets_count,
            'likes_count':tweet.likes_count,
            'hashtags':tweet.hashtags,
            'cashtags':tweet.cashtags,
            'link':tweet.link,
            'retweet':tweet.retweet,
            'quote_url':tweet.quote_url,
            'video':tweet.video,
            'user_rt_id':tweet.user_rt_id,
            'geo':tweet.geo,
            'near':tweet.near,
            'source':tweet.source,
            'retweet_date':tweet.retweet_date
        })  
    return jsonify(tweets)

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000)