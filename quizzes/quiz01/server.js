// Author: Spencer Baysinger
// File: server.js
// Created: 2025-01-17
// Updated: 2025-01-28
// Function: This file is the server script that will be run by the manager script. 
//           It is responsible for serving the main page and logging the client's 
//           IP address to a CSV file. The server script also logs the client's IP address to the console. 
//           The server script is started by the manager script as a child process and communicates with the 
//           manager script through console logs process through a function with a special tag '[TO_MANAGER]'.

const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


// ------------------------------------------
// Middleware to log client IP address
// ------------------------------------------
app.use((req, res, next) => {
  // Record timestamp
  const timeStamp = Formattimestamp(1);
  
  // Record IP 
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const formattedIp = clientIp.includes('::ffff:') ? clientIp.split('::ffff:')[1] : clientIp;
  const finalIp = formattedIp === '::1' ? '127.0.0.1' : formattedIp;

  // Create a CSV entry
  const csvEntry = `TIME{${timeStamp}},IP{${finalIp}}\n`;
  RecordIP(csvEntry);

  // Output the client's IP address to the console
  printLog(`[${timeStamp}] Client connected: ${finalIp}`);
  next();
});


// ------------------------------------------
// Serve the main page
// ------------------------------------------
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'public', '/quiz01.html'));
});


// ------------------------------------------
// Start the server
// ------------------------------------------
const server = app.listen(port, () => {
  printLog(`This is a server.`)
  printLog(`Server running at http://localhost:${port}/`)
  
  const processId = process.pid;
  printLog(`Process ID: ${processId}`)
  printLog(`To stop the server, press 'CTRL+C'.`)
});


// ------------------------------------------
// Append CSV Entry with Timestamp and IP
// ------------------------------------------
function RecordIP(csvEntry) {
  const timeStamp = Formattimestamp(2);
  const iplogPath = path.join(__dirname, `./database/${timeStamp}-IPlog.csv`);
  fs.appendFile(iplogPath, csvEntry, (err) => {
    if (err) {
      printLog(`Error writing to log.csv: ${err}`)
    }
  });
}


// ------------------------------------------
// Format Timestamp
// ------------------------------------------
function Formattimestamp(selectTimeFormat) {
  // Get the current date and time
  // Input 1: YY-MM-DD HH:MM:SS
  // Input 2: YYMM
  const now = new Date();
  const yy = String(now.getFullYear()); // Digits of the year
  const mm = String(now.getMonth() + 1).padStart(2, '0'); // Month (01-12)
  const dd = String(now.getDate()).padStart(2, '0'); // Day (01-31)
  const hh = String(now.getHours()).padStart(2, '0'); // Hours (00-23)
  const min = String(now.getMinutes()).padStart(2, '0'); // Minutes (00-59)
  const ss = String(now.getSeconds()).padStart(2, '0'); // Seconds (00-59)
  if (selectTimeFormat == 1) return `${yy}-${mm}-${dd} ${hh}:${min}:${ss}`;
  if (selectTimeFormat == 2) return `${yy}${mm}`;
}


// // ------------------------------------------
// // Function to print log messages
// // ------------------------------------------
function printLog(message) {
  console.log(`[TO_MANAGER] ${message}`);
}