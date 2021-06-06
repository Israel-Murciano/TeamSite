#!/usr/bin/python3.6
# -*- coding: utf-8 -*-

import socket, requests, subprocess
from time import sleep
import sys, re,os
import pymongo


systems = {}
client = pymongo.MongoClient("localhost", 27017)
client.TeamSite.authenticate('user', 'password')
db = client.TeamSite
collection = db["svms"]

db.svms.remove({})

file=open("/root/svm_list","r")
for svm in file.readlines():
        result = os.popen("getent hosts {} | awk '{{print $1}}'".format(svm.rstrip())).read()

        if re.search("^220.12",result):
              client = pymongo.MongoClient("localhost", 27017)
              client.TeamSite.authenticate('user', 'password')
              db = client["TeamSite"]
              col = db["svms"]
              doc = {"svm_name" : svm, "site" : "Site A"}

              db.svms.insert(doc)
        elif re.search("^188.35",result):
              client = pymongo.MongoClient("localhost", 27017)
              client.TeamSite.authenticate('user', 'password')
              db = client["TeamSite"]
              col = db["svms"]
              doc = {"svm_name" : svm, "site" : "Site B"}

              db.svms.insert(doc)
        else:
              client = pymongo.MongoClient("localhost", 27017)
              client.TeamSite.authenticate('user', 'password')
              db = client["TeamSite"]
              col = db["svms"]
              doc = {"svm_name" : svm, "site" : "No Ping"}

              db.svms.insert(doc)