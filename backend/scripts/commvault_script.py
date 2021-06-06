#!/usr/bin/python3.6
# -*- coding: utf-8 -*-

from cvpysdk.commcell import Commcell
import sys
import re
import os
import pymongo
import ast
<<<<<<< HEAD
commcell = Commcell('CommServer', 'domian\user', 'password')
=======
commcell = Commcell('CommServer', 'domian\user', 'password')
>>>>>>> e106143aadcc008309a5299b0b0ee96893c6cce6

client = pymongo.MongoClient("localhost", 27017)
client.TeamSite.authenticate('user', 'password')
db = client["TeamSite"]
col = db["backups"]

col.remove({})
<<<<<<< HEAD
"""with open(r"./server","r") as failed:
  SRVLIST = failed.read().split('test')
  del SRVLIST[-1]
  for fail in SRVLIST:
    col.insert_one(ast.literal_eval(fail.rstrip()))
"""
with open(r"./server","r") as failed:
  SRVLIST = failed.read().split('test')
  del SRVLIST[-1]
  for fail in SRVLIST:
    col.insert_one(ast.literal_eval(fail.rstrip()))
with open(r"./Server","r") as failed:
  SRVLIST = failed.read().split('test')
  del SRVLIST[-1]
  for fail in SRVLIST:
    col.insert_one(ast.literal_eval(fail.rstrip()))
with open(r"./Server","r") as failed:
  SRVLIST = failed.read().split('test')
  del SRVLIST[-1]
  for fail in SRVLIST:
=======
"""with open(r"./Server1","r") as failed:
  ServerList = failed.read().split('test')
  del ServerList[-1]
  for fail in ServerList:
    col.insert_one(ast.literal_eval(fail.rstrip()))
"""
with open(r"./Server2","r") as failed:
  ServerList = failed.read().split('test')
  del ServerList[-1]
  for fail in ServerList:
    col.insert_one(ast.literal_eval(fail.rstrip()))
with open(r"./Server1","r") as failed:
  ServerList = failed.read().split('test')
  del ServerList[-1]
  for fail in ServerList:
    col.insert_one(ast.literal_eval(fail.rstrip()))
with open(r"./Server2","r") as failed:
  ServerList = failed.read().split('test')
  del ServerList[-1]
  for fail in ServerList:
>>>>>>> e106143aadcc008309a5299b0b0ee96893c6cce6
    col.insert_one(ast.literal_eval(fail.rstrip()))

os.system("echo '{}' | awk '{{print $2}}' > /root/comm_clients".format(commcell.clients))
os.system("sed -i '/^$/d' comm_clients")

with open("/root/comm_clients","r") as clients:
  for client in list(set(clients.readlines())):
   print(client)
   IgnoredServer = True
   with open("/root/comm_ignore","r") as ignore:
      for IgnoreServer in ignore.readlines():
        if re.search(IgnoreServer.rstrip(),client):
          IgnoredServer = False
   with open("/root/Postgres_ignore","r") as PostgresIgnore:
      for IgnoreServer in PostgresIgnore.readlines():
        if re.search(IgnoreServer.rstrip(),client):
          IgnoredServer = False

   if IgnoredServer:
     Failed = False
     try:
       all_jobs = (commcell.job_controller.finished_jobs(client_name=client.rstrip(),lookup_time=48,show_aged_job=True))
     except:
       pass
     jobList = []
     for job in all_jobs:
       if ("Failed" in (all_jobs[job]['status'])):
         print(job)
         FailedJob = commcell.job_controller.get(job)
         jobList.append({"instancename" : FailedJob.instance_name, "subclientname" : FailedJob.subclient_name, "starttime" : FailedJob.start_time,"endtime" : FailedJob.end_time, "backuplevel" : FailedJob.backup_level, "backuptype" : FailedJob.backupset_name, "status" : FailedJob.status, "failurereason" : FailedJob.pending_reason})
         Failed = True
     if Failed:
       col.insert_one({ "nodename" : client.rstrip(), "FailedJobs" : jobList, "comment" : "" })