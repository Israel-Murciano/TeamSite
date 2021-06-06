#! /usr/bin/python

# importing relevant modules
import requests, sys
from requests.auth import HTTPDigestAuth
from datetime import datetime
import pymongo

client = pymongo.MongoClient("localhost", 27017)
client.TeamSite.authenticate('user', 'password')
db = client["TeamSite"]
col = db["mms"]

# declare some variables
apps_group = []
MMS_Site = "mms.com"
url = 'https://%s/api/public/v1.0/groups/' % MMS_Site
MMS_User = "user"
MMS_API = "???"

# ignore SSL error
requests.packages.urllib3.disable_warnings()

# request the API
js = requests.get(url, auth=HTTPDigestAuth(MMS_User, MMS_API), verify=False).json()
# loop over every app in the MMS
group_arr = js['results']
for app in group_arr:
    # check if the replica set has backups
    if app['replicaSetCount']:
        apps_group.append((app['name'], app['id']))

# loop over every backup in each app
for app_name, group_id in apps_group:
    # get the cluster id
    url = 'https://%s/api/public/v1.0/groups/%s/clusters/' % (MMS_Site, group_id)
    js = requests.get(url, auth=HTTPDigestAuth(MMS_User, MMS_API), verify=False).json()
    cluster_id = js['results'][0]['id']

    # get all the backups
    backup_url = '%s%s/snapshots/' % (url, cluster_id)
    js = requests.get(backup_url, auth=HTTPDigestAuth(MMS_User, MMS_API), verify=False).json()
    backups = js["results"]

    # check if every backup has finished successfully
    dates = []
    for gibuy in backups:
        if gibuy['complete']:
            dates.append(datetime.strptime(gibuy['created']['date'], '%Y-%m-%dT%H:%M:%SZ'))

    # check the most recent backup
    try:
        max_date = max(dates)
    except ValueError:
        continue
        
    # get the start and end time of the most recent backup
    for gibuy in backups:
        if datetime.strptime(gibuy['created']['date'], '%Y-%m-%dT%H:%M:%SZ') == max_date:
            start_time = datetime.strptime(gibuy['created']['date'], '%Y-%m-%dT%H:%M:%SZ')
            expired_time = datetime.strptime(gibuy["expires"], '%Y-%m-%dT%H:%M:%SZ')

    # check if the most recent backup started at least 1 days ago
    if (datetime.today() - start_time).days >= 2:
        is_ok = 'False'
    else:
        is_ok = 'True'

    col.insert_one({ "appname" : app_name, "starttime" : start_time, "expired_time" : expired_time, "isok" : is_ok })