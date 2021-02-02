const express = require('express')
const path = require('path')

const app = express()

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'))
  })

app.get('/api/notes', function (req, res) {
    res.sendFile(path.join(__dirname, './db/db.json'))
})

app.post('/api/notes', function (req, res) {
    res.send('in the post endpoint')
})

app.delete('/api/notes/:id', function (req, res) {
    res.send('in the delete endpoint')
})

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'))
  })
  

  app.listen(3000, function () {
    console.log('app is running')
  })

