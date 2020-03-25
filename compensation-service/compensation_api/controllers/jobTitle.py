from flask import make_response
from bson import json_util, ObjectId
import json
import pymongo

# MongoDB connection
client = pymongo.MongoClient("mongodb://mongo:27017/")
db = client["employees"]
collection = db["jobTitle"]

def listToJson(data):
    return json.loads(json_util.dumps(list(data)))

def objectToJson(data):
    return json.loads(json_util.dumps(data))

def findAll():
    return listToJson(collection.find())

def findById(id):
    return objectToJson(collection.find_one({'_id': ObjectId(id)}))

def create(jobTitle):
    saved_corporate = corporateCollection.insert_one(jobTitle)
    return make_response(
        "Corporate successfully created"#, objectToJson(saved_corporate), 201
    )
