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



// -------------------------------------------
// This is the slideshow function for homepage
// -------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
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
});