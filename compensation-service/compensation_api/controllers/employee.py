from flask import make_response
from bson import json_util, ObjectId
import json
import pymongo
import statistics

# MongoDB connection
client = pymongo.MongoClient("mongodb://mongo:27017/")
db = client["employees"]
collectionEmployee = db["employee"]
collectionCorporate = db["corporate"]

def listToJson(data):
    return json.loads(json_util.dumps(list(data)))

def objectToJson(data):
    return json.loads(json_util.dumps(data))

def findAll():
    return listToJson(collectionEmployee.find())

def create(employee):
    #saved_employee = collection.insert_one(employee)
    collectionEmployee.insert_one(employee)
    return make_response(
        "Employee successfully created", 201 #, objectToJson(saved_employee), 201
    )

def findAllByJobTitle(jobTitle):
    return listToJson(collectionEmployee.find({'title': jobTitle}))

def findMinMedianAndMaxSalaryByJobTitleFromCorporates(jobTitle, corporates):
    employees = listToJson(collectionEmployee.find({ '$and': [ {'title': jobTitle}, { 'company': { '$in' : corporates}}]}))
    corporateDictionary = {}
    for employee in employees:
        corporateDictionary.setdefault(employee['company'], []).append(employee['salary'])
    filteredList = []
    for corporate in corporateDictionary:
         corporateFromCollection = objectToJson(collectionCorporate.find_one({"_id": ObjectId(corporate)}))
         data_set = {
            "corporate": corporateFromCollection['name'],
            "title": employee['title'],
            "min": min(corporateDictionary[corporate]),
            "median": statistics.median(corporateDictionary[corporate]),
            "max": max(corporateDictionary[corporate])
         }
         filteredList.append(data_set)
    return filteredList

def findSalaryIncreaseByExperienceYearsFromCorporates(jobTitle, corporates):
    employees = listToJson(collectionEmployee.find({ '$and': [ {'title': jobTitle}, { 'company': { '$in' : corporates}}]}))
    corporateDictionary = {}
    for employee in employees:
        corporateDictionary.setdefault(employee['company'], []).append({
            "experience" :employee['experience'],
            "salary" :employee['salary']
        })
    filteredList = []
    for key, values in corporateDictionary.items():
         corporateFromCollection = objectToJson(collectionCorporate.find_one({"_id": ObjectId(key)}))
         data_set = {
            "name": corporateFromCollection['name'],
            "data": values
         }
         filteredList.append(data_set)
    return filteredList
