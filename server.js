// setting up the variables in order to be read on the back end.
// we are importing express, path, fs and FS modules.
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

// converts the fs files into propmise based, making it easier to work and code with.
const readFileAsync = util.promisify(fs.readFile);
const writedFileAsync = util.promisify(fs.writeFile);

// setting up the server port
const app = express();
const PORT = process.env.PORT || 3099;

app.use(express.urlencoded({extended: true }));
app.use(express.json());


//middleware
app.use(express.static("./Develop/public"));

// creating a route for api/notes=the 'get' request
// creates a readFileAsync function, which the file will be able to be read or not. If not, it will give an error.
// the parse converts into a json string
// helps us change the file the data into json
app.get("./api/notes", function(req, res) {
    readFileAsync("./Develop/db/db.json", "uts8").then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});



