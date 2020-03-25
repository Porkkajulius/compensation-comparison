from flask import make_response
from bson import json_util, ObjectId
import json
import pymongo
import statistics

# MongoDB connection
client = pymongo.MongoClient("mongodb://mongo:27017/")
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

def findMinMedianAndMaxSalaryByJobTitleFromCorporates(jobTitle, corporates):
    employees = listToJson(collection.find({'title': jobTitle}))
    corporateDictionary = {}
    for employee in employees:
        corporateDictionary.setdefault(employee['company'], []).append(employee['salary'])
    filteredDictionary = {}
    for corporate in corporateDictionary:
         filteredDictionary.setdefault(corporate, []).append(min(corporateDictionary[corporate]))
         filteredDictionary.setdefault(corporate, []).append(statistics.median(corporateDictionary[corporate]))
         filteredDictionary.setdefault(corporate, []).append(max(corporateDictionary[corporate]))
    return filteredDictionary
