const fs = require('fs');
const util = require('util');
const uuid = require('uuid/v4');



const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

module.exports= function(app){


// * The following API routes should be created:

//   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.

app.get('/api/notes', async function(req, res){
    const db = JSON.parse(await readFileAsync("./db/db.json", 'utf8'));
    res.json(db);
  });

//   * POST `/api/notes` - Should recieve a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

app.post('/api/notes', async function(req, res){
    let allNotes;
    //read our existing notes
    const db = JSON.parse(await readFileAsync("./db/db.json", 'utf8'));
  //create our new note
    const note = { ...req.body, id: uuid() };
    console.log(note);
    //concatonate allNotes to the notes we already have
    allNotes = [].concat(db)
    //push new note to all Notes
    allNotes.push(note);
    //rewrte db.json with our new notes array

    const notes = writeFileAsync("./db/db.json", JSON.stringify(allNotes))
    
      res.json(notes);
  
  });

//   * DELETE `/api/notes/:id` - Should recieve a query paramter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

app.delete('/api/notes/:id', async function(req, res){
    const db = JSON.parse(await readFileAsync('./db/db.json', 'utf8'));
    const id = req.params.id;
    const database = db.filter(note => {
      return note.id !== id;
    });
  
    const notes = await writeFileAsync("./db/db.json", JSON.stringify(database))
    res.json(database);
  });
}