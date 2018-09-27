const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const dbUrl = 'mongodb://localhost/crudwithredux';


function validate(data) {
  let errors = {};
  if (data.title === '') errors.title = "Can't be empty";
  if (data.cover === '') errors.cover = "Can't be empty";
  const isValid = Object.keys(errors).length === 0
  return { errors, isValid };
}

MongoClient.connect(dbUrl, function(err, db) {

  
  app.get('/api/movies', (req, res) => {
   db.collection('movies').find({}).toArray((err, movies) => {
      res.json({ movies });
    });
  });

  app.post('/api/movies', (req, res) => {
    const { errors, isValid } = validate(req.body);
    if (isValid) {
      const { title, cover } = req.body;
      db.collection('movies').insert({ title, cover }, (err, result) => {
        if (err) {
          res.status(500).json({ errors: { global: "Something went wrong. Try later. We are fixing it." }});
        } else {
          res.json({ movie: result.ops[0] });
        }
      });
    } else {
      res.status(400).json({ errors });
    }
});

app.put('/api/movies/:_id', (req, res) => {
  const { errors, isValid } = validate(req.body);

  if (isValid) {
    const { title, cover } = req.body;
    db.collection('movies').findOneAndUpdate(
      { _id: new mongodb.ObjectId(req.params._id) },
      { $set: { title, cover } },
      { returnOriginal: false },
      (err, result) => {
        if (err) { res.status(500).json({ errors: { global: err }}); return; }

        res.json({ movie: result.value });
      }
    );
  } else {
    res.status(400).json({ errors });
  }
});

app.get('/api/movies/:_id', (req, res) => {
  db.collection('movies').findOne({ _id: new mongodb.ObjectId(req.params._id) }, (err, movie) => {
    res.json({ movie });
  })
});

app.delete('/api/movies/:_id', (req, res) => {
  db.collection('movies').deleteOne({ _id: new mongodb.ObjectId(req.params._id) }, (err, r) => {
    if (err) { res.status(500).json({ errors: { global: err }}); return; }

    res.json({});
  })
});

  app.use((req, res) => {
    res.status(404).json({
      errors: {
        global: "This is not the page which you are looking for. Go Back."
      }
    });
})

// listening on port 8080 for requests
app.listen( 8080, () => console.log('Server is running on localhost:8080'));

});