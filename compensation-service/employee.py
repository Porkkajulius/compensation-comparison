from flask import make_response
from bson import json_util, ObjectId
import json
import pymongo

# MongoDB connection
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["employees"]
collection = db["employee"]

def listToJson(data):
    return json.loads(json_util.dumps(list(data)))

def objectToJson(data):
    return json.loads(json_util.dumps(data))

def findAll():
    return listToJson(collection.find())

def create(employee):
    saved_employee = collection.insert_one(employee)
    return make_response(
        "Employee successfully created", objectToJson(saved_employee), 201
    )

def findAllByJobTitle(jobTitle):
    return listToJson(collection.find({'title': jobTitle}))

# TODO fininalize
def findMinMedianAndMaxSalaryByJobTitleFromCorporates(jobTitle, corporates):
    employees = listToJson(collection.find({'title': jobTitle}))
    employeeDictionary = {}
    for employee in employees:
        employeeDictionary.setdefault(employee['company'], []).append(employee['salary'])
    filteredDictionary = {}
    return employeeDictionary
