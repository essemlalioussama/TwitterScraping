from tweet import tweetsByTopic,tweetsByCity
from flask import Flask, jsonify, request

app = Flask(__name__)
app.config["DEBUG"]=True
app.config['JSON_AS_ASCII'] = False
@app.route('/api/tweets/',methods=['GET'])
def api_topic():
    if 'topic' in request.args:
        topic=str(request.args['topic'])
    else:
        return "Error : no topic field provided. please specify a one"
    tweets = tweetsByTopic(topic)
    return jsonify(tweets)

if __name__ == '__main__':
    app.run()