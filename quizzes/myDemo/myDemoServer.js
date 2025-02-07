// Author: Spencer Baysinger
// File: myDemoServer.js
// Created: 2025-02-06
// Updated: 2025-02-06
// Function: 

// Spool server
// npm install express mongodb body-parser
// node myDemoServer.js

// Verify database
// mongosh
// use myDemoDB
// show collections
// db.myDemoCollection.find()
// db.myDemoCollection.insertOne({ text: 'testing01' })
// db.myDemoCollection.find()


const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const hostname = '127.0.0.1';
const port = 6543;
const app = express();

// Serve static files (HTML, CSS, JS) from current directory
app.use(express.static(__dirname));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB setup
const uri = "mongodb://127.0.0.1:27017"; // adjust if needed
const client = new MongoClient(uri);
let db;

// Connect to MongoDB once at startup
client.connect()
  .then(() => {
    db = client.db('myDemoDB'); // name your DB
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Serve the main HTML page (myDemoWebpage.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'myDemoWebpage.html'));
});

// POST /submit -> insert { text } into "myDemoCollection"
app.post('/submit', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).send('No text provided');
    }
    await db.collection('myDemoCollection').insertOne({ text });
    res.send('Data inserted successfully!');
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).send('Internal Server Error');
  }
});

// GET /texts -> return all texts in "myDemoCollection"
app.get('/texts', async (req, res) => {
  try {
    const results = await db.collection('myDemoCollection').find({}).toArray();
    res.json(results); 
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
