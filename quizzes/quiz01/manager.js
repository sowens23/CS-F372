// Author: Spencer Baysinger
// File: manager.js
// Created: 2025-01-27
// Updated: 2025-01-28
// Function:  This file is the manager script that will be run by the user.
//            It is responsible for starting and stopping the server script as a child process.
//            The manager script also logs the server's output to the console and provides a simple 
//            command-line interface for the user to interact with the server.
// Windows Run-Command: node manager.js

// To-Do
// - Parse log messages in JSON format
// - Zero downtime restarts
// - Auto restart on crash
// - Investigate rl pause/resume around console logs


const readline = require('readline');
const { spawn } = require('child_process');
let previousLog = ''; // Variable to store the previous server log message
let duplicateLog = 0; // Variable to store the duplicate log count

const SERVER_SCRIPT = './server.js';

//Store the child process here
let child;

// Setup readline interface in the manager console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});


// ------------------------------------------
// Start the server
// ------------------------------------------
function startServer() {
  // Start server as a child process
  console.log('Starting the child server...');
  child = spawn('node', [SERVER_SCRIPT], {
    stdio: ['ignore', 'pipe', 'pipe'], 
    // 'ignore' means we don't send our stdin to the child
    // 'pipe' means we capture the child's stdout/stderr in the parent
  });

  // Print child's stdout
  child.stdout.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach((line) => {
      if (!line.trim()) return;
  
      // Check for your special tag:
      if (line.startsWith('[TO_MANAGER]')) {
        // Only logs from your server that match the prefix
        const logMessage = line.replace('[TO_MANAGER]', '').trim();
        printLog('server', logMessage);
      } else {
        // Possibly ignore or print differently
        printLog('child-other', line);
      }
    });
  });

  // Print child's stderr in red or simply as error
  child.stderr.on('data', (data) => {
    printLog('server:ERR', data.toString());
  });

  child.on('error', (err) => {
    console.error('Failed to start child server:', err);
  });

  child.on('exit', (code) => {
    console.log(`Child server exited with code ${code}`);
  });
}

function stopServer(callback) {
  if (!child) {
    if (callback) callback();
    return;
  }
  console.log('Stopping the server...');

  // Once the child process fully exits, run the callback
  child.on('exit', () => {
    console.log('Server stopped.');
    child = null;
    if (callback) callback();
  });

  // Kill the child process
  child.kill();
}

// Start the server immediately
startServer();


// ------------------------------------------
// Create interface to read user input
// ------------------------------------------
rl.on('line', (line) => {
  const command = line.trim();

  switch (command) {
    case 'help':
      console.log('Available commands:');
      console.log('- help: Show this help message');
      console.log('- stats: Show server statistics');
      console.log('- restart: Restarts the server');
      console.log('- stop: Stop the server');
      break;

    case 'stats':
      console.log(`Manager Process ID: ${process.pid}`);
      console.log(`Uptime: ${process.uptime().toFixed(2)} seconds`);
      break;

    case 'restart':
      console.log('Restarting the server...');
      stopServer(() => {
        console.log('Server stopped. Restarting...');
        startServer();
      });
      break;
      
    case 'stop':
      stopServer(() => process.exit(0));
      break;

    default:
      console.log(`Unknown command: ${command}`);
      break;
  }

  rl.prompt(); // Show the prompt again
});

rl.on('close', () => {
  console.log('Console closed.');
  stopServer(() => process.exit(0));
});


// ------------------------------------------
// Function to print log messages
// ------------------------------------------
function printLog(sender, message) {
  const currentLine = rl.line;
  const cursorPosition = rl.cursor;

  // Save cursor
  process.stdout.write('\x1B[s');

  // Print message log
  if (message === previousLog) {
    process.stdout.write('\x1B[F\x1B[K'); // Move up and clear the line
    duplicateLog++;
    process.stdout.write(`[${sender}] ${message} x${duplicateLog}\n`);
  } else {
    process.stdout.write('\x1B[F\n'); // Move up and New line
    duplicateLog = 0;
    process.stdout.write(`[${sender}] ${message}\n`); // Move up and New line
  }
  previousLog = message;
  
  // Restore the prompt and input line
  process.stdout.write(`> ${currentLine}`); // Reprint the input line with the prompt
  const moveForward = currentLine.length - cursorPosition; // Distance from end to cursor
  if (moveForward > 0) {
    process.stdout.write(`\x1B[${moveForward}D`); // Move the cursor back
  }
}