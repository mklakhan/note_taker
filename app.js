const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, './public')))

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'))
  })

app.get('/api/notes', function (req, res) {
    res.sendFile(path.join(__dirname, './db/db.json'))
})

app.post('/api/notes', function (req, res) {
  console.log(req.body)
  fs.readFile(path.join(__dirname, './db/db.json'), function(err, data) {
    let notes = JSON.parse(data)
    console.log('notes:', notes)
    notes.push(req.body)
    fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(notes), function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  });
    res.json(req.body)
})

app.delete('/api/notes/:id', function (req, res) {
  console.log(req.params)
  fs.readFile(path.join(__dirname, './db/db.json'), function(err, data) {
    let notes = JSON.parse(data)
    // console.log('notes:', notes)
    let newNotes = notes.filter(item => {
      if (item.id === req.params.id){
        return false
      } else {return true}
    });
    fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(newNotes), function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  });

    res.send('in the delete endpoint')
})

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'))
  })
  
let PORT = process.env.PORT || 3000;

  app.listen(PORT, function () {
    console.log('app is running in port 3000')
  })

