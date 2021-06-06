const express = require ("express");
const mongoose = require("mongoose");
const bodyParser = require ("body-parser");
const passport = require("passport");
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const {Readable} = require('stream');
const app = express()
const router = express.Router();
const users = require("./routes/api/users");



//Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(cors());
app.use(bodyParser.json());

// DB Config and connection
const db = require("./config/keys").mongoURI;

//Passport middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

/////////////////////////////////
        // ROUTES //
/////////////////////////////////

// (POST) File Upload
const fileUpload = require('./routes/apps_api/fileUpload')
app.use('/api/upload', fileUpload);

// (GET) Get all Apps route
const getApps = require('./routes/apps_api/getApps');
app.use('/api/apps/', getApps);

// (GET) Get specific app route
const getApp = require('./routes/apps_api/getApp');
app.use('/api/app/', getApp);

// (GET) Get strings regex route
const searchApp = require('./routes/apps_api/search');
app.use('/api/search/', searchApp);

// (POST) Add an app route
const addApp = require('./routes/apps_api/addApp');
app.use('/api/app/', addApp);

// (POST) Edits an app route
const editApp = require('./routes/apps_api/editApp');
app.use('/api/update/', editApp);

// (POST) Delete app route
const deleteApp = require('./routes/apps_api/deleteApp');
app.use('/api/delete/', deleteApp);

// (GET && POST) Connection users route
app.use('/api/users', users);

// (GET && POST) Connection to password file route
const passwordRouter = require('./routes/apps_api/passwords');
app.use('/api/passwords', passwordRouter);

// (GET) Send pdf to client route
const sendPDF = require('./routes/apps_api/getpdf');
app.use('/api/getpdf',sendPDF);

// (GET) Delete PDF 
const deletePDF = require('./routes/apps_api/deletePdf');
app.use('/api/deletepdf',deletePDF);

// (GET) Gets commvault backups
const commvaultBackup = require('./routes/apps_api/getBackups');
app.use('/api/backups/',commvaultBackup)

// (GET) Gets commvault backups
const commvaultBackup2 = require('./routes/apps_api/getBackupcomments');
app.use('/api/backupcomments/',commvaultBackup2)

// (GET) Gets Mivzai Shifts
const Shifts = require('./routes/apps_api/getShifts');
app.use('/api/shifts/',Shifts)

// (GET) Get specific shift 
const getShift = require('./routes/apps_api/getShift');
app.use('/api/shift/', getShift);

// (POST) Edits a shift
const editShift = require('./routes/apps_api/editShift');
app.use('/api/shiftUpdate/', editShift);

// (POST) Create a shift
const newShift = require('./routes/apps_api/createShift');
app.use('/api/createShift/', newShift);

// (GET) Gets Mivzai Special Events
const specialEvents = require('./routes/apps_api/getSpecialEvents');
app.use('/api/specialEvents/',specialEvents)

// (GET) Get specific Special Event 
const specialEvent = require('./routes/apps_api/getSpecialEvent');
app.use('/api/specialEvent/', specialEvent);

// (POST) Edits a special Event
const editSpecialEvent = require('./routes/apps_api/editSpecialEvent');
app.use('/api/updateSpecialEvent/', editSpecialEvent);

// (POST) Create a special Event
const newEvent = require('./routes/apps_api/addSpecialEvent');
app.use('/api/specialEvent/', newEvent);

// (GET) Gets Mivzai Humans
const Humans = require('./routes/apps_api/getHumans');
app.use('/api/humans/',Humans)

// (POST) Create a human
const newHuman = require('./routes/apps_api/addHuman');
app.use('/api/humans/', newHuman);

// (GET) Get all Journal events
const getEvents = require('./routes/apps_api/events');
app.use('/api/events/', getEvents);

// (GET) Get all switchovers
const getSwitchovers = require('./routes/apps_api/switchovers');
app.use('/api/switchovers/', getSwitchovers);

// (GET) Add switchover to an app
const addSwitchovers = require('./routes/apps_api/addSwitchover');
app.use('/api/switchovers/', addSwitchovers);

// (GET) Get all SVM
const getSVM = require('./routes/apps_api/svm');
app.use('/api/svms/', getSVM);

// (GET) Get all SVM
const getSVMlist = require('./routes/apps_api/svmlist');
app.use('/api/svmlists/', getSVMlist);

// (GET) Get all Phones
const getPhone = require('./routes/apps_api/phones');
app.use('/api/phones/', getPhone);

// (GET) Get all Nitur
const getNitur = require('./routes/apps_api/niturs');
app.use('/api/niturs/', getNitur);

// (GET) Get all Tasks
const getTasks = require('./routes/apps_api/tasks');
app.use('/api/tasks/', getTasks);

// (GET) Get all SVM
const getMMS = require('./routes/apps_api/mms');
app.use('/api/mms/', getMMS);

// (GET) 
const nohalFile = require('./routes/apps_api/searchNohals');
app.use('/api/nehalim/', nohalFile); 
  
// (GET) Get all activities
const activities = require('./routes/apps_api/activities');
app.use('/api/activities/', activities);

// (GET) Get all Urls
const urls = require('./routes/apps_api/Urls');
app.use('/urls/', urls);

// (POST) Delete a user
const deleteUser = require('./routes/apps_api/deleteUser');
app.use('/api/deleteUser', deleteUser);

// (GET) Get all Users
const getUsers = require('./routes/apps_api/getUsers');
app.use('/api/getUsers', getUsers);


// (POST) Tasks Files Upload
const tasksUpload = require('./routes/apps_api/tasksUpload');
app.use('/api/tasksUpload', tasksUpload);

//////////////////////////
// CONNECTION TO DBs
/////////////////////////

// Should Be Removed When All functions will move to routes/apps_api
mongoose.connect('mongodb://user:password@MongoServer:27017/TeamSite', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
        console.log("MongoDB database connection established successfuly");
})

// Start Server
app.listen(8182,'0.0.0.0');
module.exports = app;

