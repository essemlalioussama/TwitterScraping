import twint,json
def tweetsByTopic(topic):
    tweets_dic=[]
    with open("./cities.json",'r',encoding='UTF-8') as countries:
        for country in json.load(countries) :
            tweets_dic.append(tweetsByCity(topic,str(country["city"])))
    return tweets_dic

def tweetsByCity(topic,city=""):
    twint.output.tweets_list.clear()
    c = twint.Config()
    c.Search = topic
    c.Limit = 2
    c.Near=city
    c.Store_object= True
    c.Geo = "48.856613,2.352222,10000km"
    c.Show_hashtags = False
    c.Hide_output=True
    twint.run.Search(c)
    tweets=[]
    for tweet in twint.output.tweets_list:
        tweets.append({
            'username':tweet.username,
            'tweet':tweet.tweet,
            'date':tweet.datestamp+" "+tweet.timestamp,
            #'geo':tweet.geo,
            'ville':tweet.near,
            'hashtags':tweet.hashtags
        })
    return tweets
#c.Lang = "fr"
# c.Username = "KylieJenner"
#c.Location=True
#c.Geo = "48.856613,2.352222,10km"
# c.Store_csv = True # c.Output = "none.csv" # c.Translate = True # c.Location=True#c.TranslateDest = "fr"
# for tweet in tweets:
#     print(tweet.tweet)
#     print("----------------------------")
#remove_file_if_existe('tweets.json')
#c.Output = "tweets.json"
# Run
