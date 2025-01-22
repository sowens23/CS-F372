// Name: Spencer Bayinsger
// Date: 2025-01-17
// Filename: scripts.js
// Purpose: Scripts for quiz01.html



// -------------------------------------------------------------
// This is the script to set website pages to active or inactive
// -------------------------------------------------------------

function showPage(pageId, tabId) {
  // Hide all content sections
  var contents = document.querySelectorAll('.content');
  contents.forEach(content => content.classList.remove('active'));

  // Remove active class from all tabs 
  var tabs = document.querySelectorAll('ul li'); 
  tabs.forEach(tab => tab.classList.remove('active'));

  // Show the selected content
  document.getElementById(pageId).classList.add('active');

  // Add active class to the selected tab
  document.getElementById(tabId).classList.add('active');
}



document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------------------
  // This is the slideshow function for homepage
  // -------------------------------------------
  const slides = document.querySelectorAll('.slideshow-slide');
  let currentSlideIndex = 0;
  
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }
  
  // Show the first slide initially
  showSlide(currentSlideIndex);
  
  // Automatically rotate every 3 seconds
  setInterval(() => {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
  }, 3000);


  // ----------------------------------------------
  // Display "Logged in" message after login submit
  // ----------------------------------------------
  const loginForm = document.getElementById('loginForm');
  const loggedInMessage = document.getElementById('loggedInMessage');
  loginForm.addEventListener('submit', (event) => {
    // Prevent the form from redirecting (optional; remove if you want a real POST)
    event.preventDefault();

    // Assuming the form is valid, hide the form and show the message
    // Hide the login form
    loginForm.style.display = 'none';
    // Show the "logged in" message
    loggedInMessage.style.display = 'block';
  });
});