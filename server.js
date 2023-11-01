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

// allowing notes to be saved. a Post request
app.post("/api/notes", function(req, res) {
    const note = req.body;
    readFileAsync("./Develop/db/db.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
        note.id = notes.length + 1
        notes.push(note);
        return notes
    }).then(function(notes) {
        writeFileAsync("./Develop/db/db.json", JSON.stringify(notes))
   })
});

// Note delete request function
app.delete("/api/notes:id", function(req, res) {
    const idToDelete = parseInt(req.params.id);
    readFileAsync("./Develop/db/db.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
        const newNotes = []
        for (let i= 0; i<notes.length; i++) {
            if(idToDelete !== notes[i].id) {
                newNotes.push(notes[i])
            }
        }
        return newNotes
    }).then(function(notes) {
        writeFilesAsync("./Develop/db/db.json", JSON.stringify(notes))
        res.send('Saved!!');
    })
})

// first get request gives access to the notes route, then the index.html, then another other paths that have not been specified.
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

app.listen(PORT, function() {
    console.log("App Listening on PORT " + PORT);
});
