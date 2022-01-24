from tweet import tweetsByCity
from flask import Flask, jsonify, request
import random

app = Flask(__name__)
app.config["DEBUG"]=True
app.config['JSON_AS_ASCII'] = False


@app.route('/tweets',methods=['POST'])
def api_topic():
    request_data = request.get_json()
    if 'topic' in request_data:
        topic=str(request_data['topic'])
        city=str(request_data['city'])
        limit=int(request_data['limit'])
    else:
        return jsonify({"Error" : "no topic field provided. please specify a one"})
    tweets = tweetsByCity(topic,city,limit)
    print(len(tweets))
    return jsonify(tweets)

@app.route('/tweets/<city>',methods=['POST'])
def api_topicByCity(city):
    request_data = request.get_json()
    if 'topic' in request_data:
        topic=str(request_data['topic'])
        limit=int(request_data['limit'])
    else:
        return jsonify({"Error" : "no topic field provided. please specify a one"})
    tweets = tweetsByCity(topic,city,limit)
    print(len(tweets))
    return jsonify(tweets)

@app.route('/numbers',methods=['POST'])
def api_numbers():
    request_data = request.get_json()
    for city in request_data :
        city["numbers"] = random.randint(20,30)
    return jsonify(request_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000)