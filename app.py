#! /usr/bin/env python

from flask import Flask, request
import json, requests

app = Flask(__name__)

@app.route('/')
def index():
    return open("index.html").read()

@app.route('/wit')
def wit():
    sentence = request.args.get('sentence')
    # call the wit.ai api
    headers = {'Authorization':'Bearer 3G3DYM2DTN3N6P4THDPVEYP4MSVWSMHZ'}
    url = "https://api.wit.ai/message"
    params = {'q':sentence}
    results = requests.get(url, params=params, headers=headers)
    return json.dumps(results.json())
    
if __name__ == '__main__':
    app.debug = True
    app.run()
