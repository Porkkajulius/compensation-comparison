from flask import make_response
from bson import json_util, ObjectId
import json
import pymongo

# MongoDB connection
client = pymongo.MongoClient("mongodb://mongo:27017/")
db = client["employees"]
collection = db["corporate"]

def listToJson(data):
    return json.loads(json_util.dumps(list(data)))

def objectToJson(data):
    return json.loads(json_util.dumps(data))

def findAll():
    corporates = listToJson(collection.find())
    filteredList = []
    for corporate in corporates:
        data_set = {
            "id": corporate['_id']['$oid'],
            "name": corporate['name']
        }
        filteredList.append(data_set)
    return filteredList

def findById(id):
    return objectToJson(collection.find_one({'_id': ObjectId(id)}))

def create(corporate):
    saved_corporate = corporateCollection.insert_one(corporate)
    return make_response(
        "Corporate successfully created"#, objectToJson(saved_corporate), 201
    )
