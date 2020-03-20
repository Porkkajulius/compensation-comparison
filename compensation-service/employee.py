from flask import make_response
from bson import json_util, ObjectId
import json
import pymongo

# MongoDB connection
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["employees"]
collection = db["employee"]


def getAll():
    myresults = list(collection.find())
    return json.loads(json_util.dumps(list(collection.find())))


def create(employee):
    saved_employee = collection.insert_one(employee)
    return make_response(
        "Employee successfully created", saved_employee, 201
    )
