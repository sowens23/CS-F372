const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/example', (req, res) => {
  console.log(`${req.body.fname}`);
  res.send(`Full name is:${req.body.fname} ${req.body.lname}.`);
});

const port = 8080;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client.html');
});

app.listen(port, () => {
  console.log(`Server running on port${port}`);
});