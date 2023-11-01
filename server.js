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
