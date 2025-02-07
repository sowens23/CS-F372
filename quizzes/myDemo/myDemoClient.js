// Author: Spencer Baysinger
// File: myDemoClient.js
// Created: 2025-02-06
// Updated: 2025-02-06
// Function: 

// Wait until the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const myForm = document.getElementById('myForm');
  const displayButton = document.getElementById('displayButton');
  const namesList = document.getElementById('namesList');

  // Handle form submission (POST /submit)
  myForm.addEventListener('submit', function(event) {
    event.preventDefault(); // stop the normal form submission
    
    const text = document.getElementById('fname').value; 
    // Send the text to the server as JSON
    fetch('/submit', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ text })
    })
    .then(response => response.text())
    .then(data => {
      alert(data); // e.g. "Data inserted successfully!"
      // Optionally clear the form field
      document.getElementById('fname').value = '';
    })
    .catch(error => console.error('Error:', error));
  });

  // Handle "Display Names" button
  displayButton.addEventListener('click', function() {
    fetch('/texts')
      .then(response => response.json())
      .then(data => {
        // data is an array of objects from MongoDB: [{ _id, text }, ... ]
        // Clear any previous list
        namesList.innerHTML = '';

        data.forEach(item => {
          // Create an <li> for each name
          const li = document.createElement('li');
          li.textContent = item.text;
          namesList.appendChild(li);
        });
      })
      .catch(error => console.error('Error:', error));
  });
});
