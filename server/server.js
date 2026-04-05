const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movieModel = require('./movie-model.js');
const app = express();

app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, 'files')));

app.get('/movies', function (req, res) {
  res.json(Object.values(movieModel))
})

app.get('/movies/:imdbID', function (req, res) {
  const movie = movieModel[req.params.imdbID]
  if (movie) {
    res.send(movie)
  } else {
    res.sendStatus(404)
  }
})

app.put('/movies/:imdbID', function (req, res) {
  const imdbID = req.params.imdbID
  const movie = req.body
  if (movieModel[imdbID]) {
    movieModel[imdbID] = movie
    res.sendStatus(200)
  } else {
    movieModel[imdbID] = movie
    res.status(201).send(movie)
  }
})

app.listen(3000)
console.log("Server now listening on http://localhost:3000/")