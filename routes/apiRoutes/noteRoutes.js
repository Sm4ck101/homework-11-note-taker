const router = require("express").Router();
const fs = require("fs");
const { validateNote, findbyId, createNote } = require("../../lib/note");
const notes = require("../../db/db.json");

router.get("/notes", (req, res) => {
  let results = notes;
  res.json(results);
});

router.post("/notes", (req, res) => {
  req.body.id = notes.length.toString();
  if (!validateNote(req.body)) {
    res.status(400).send("Error");
  } else {
    const note = createNote(req.body, notes);
    res.json(note);
  }
});

router.get("/notes/:id", (req, res) =>  {
    const result = findbyId(req.params.id, notes);
    if (result) {
        res.json(result);
    }   else    {
        res.send(404);
    }
});

module.exports = router;
