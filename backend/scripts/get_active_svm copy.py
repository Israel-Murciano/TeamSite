#!/usr/bin/python

# Checks active site by pinging URL and checking if the segment of the IP address is on the M alteon
# or the R alteon.

# To add system to script, read the README file.

import socket, requests, subprocess, pymongo,os,re
from time import sleep

# Get list of all systems in format: " system_name:[application_url, active_site_of_application (default Unknown)]"

print ('import React, { Component } from \'react\';')
print ('import \'@fortawesome/fontawesome-free/css/all.min.css\';')
print ('import \'bootstrap-css-only/css/bootstrap.min.css\';')
print ('import "../../css/svm.css";')
print ('export default class SvmSite extends Component {')
print ('render () {')
print ('return (')
print ('<div>')
print ('<body>')
print ('<h1><i className="fas fa-hdd mr-3 blue-text" aria-hidden="true"/><strong>Get SVM Site</strong></h1>')
print ('<table className="table3">')
systems = {}
client = pymongo.MongoClient("localhost", 27017)
client.TeamSite.authenticate('user', 'password')
db = client.TeamSite
collection = db["svms"]
array=[]
for svm_node in collection.find():
     print ('<tr>')
     result = subprocess.check_output("getent hosts " + svm_node["svm_name"] +" | awk '{print $1}'",shell=True)
     if re.search("^220.12",result):
            print ("<td>" +svm_node["svm_name"] + "</td> <td id=\"Site A\"> Site A </td>")
     elif re.search("^188.35",result):
            print ("<td>" +svm_node["svm_name"] + "</td> <td id=\"Site B\"> Site B </td>")
     else:
            print ("<td>" +svm_node["svm_name"] + "</td> <td id=\"noping\"> ????????? </td>")
     print ('</tr>')

print ('</table>')
print ('</body>')
print ('</div>')
print (')}}')