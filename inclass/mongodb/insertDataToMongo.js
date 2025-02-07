const { MongoClient } = require("mongodb");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.post('/example', (req, res) => {
  console.log(`${req.body.fname}`);
  myfname = `${req.body.fname}`;
  mylname = `${req.body.lname}`
  run(myfname, mylname).catch(console.dir)
  res.send(`Full name is:${req.body.fname} ${req.body.lname}.`);
});

const port = 8080;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client.html');
});

app.listen(port, () => {
  console.log(`Server running on port${port}`);
});

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);

async function run(myfname, mylname) {
  try {
    const mydatabase = client.db("SC2024");
    const mycollection = mydatabase.collection("users");
    // create a document to insert
    const doc = {
      fname: myfname,
      lname: mylname,
    }
    const result = await mycollection.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);