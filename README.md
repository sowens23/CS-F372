# CS-F372 Software Construction
## Class Notes and Homework Repository :dizzy: :earth_americas:
  ```
  #include <iostream>
  int main() {
    std::cout << "Hello traveler, here's a towel for protection. Take care of yourself out there." << std::endl;
    return 0;
  }
  ```

### Class Repositories
  - [sowens23-GitHub](https://github.com/sowens23)
  - [GitHubPortal](https://github.com/sowens23/Newbie-Gains/blob/main/README.md)
  - [CS-F372 Class Homepage](https://canvas.alaska.edu/courses/23575/modules)

### References
  - [HTML Tutorials](https://www.w3schools.com/html/default.asp)

# Class Notes and Assignments
  | Weekly Notes | Assignments | Other Notes |
  | --- | --- | --- |
  | [Week-1](#Week-1) | [HW00](https://github.com/sowens23/CS-F301/tree/main/homework) | |

# Week-2
[Top](#TOP)
## 2025-01-21
  - Front End (Client) has a few layers
    - Browser (Chrome)
    - Browser Engine (Chromium)
    - Runtime (Javascript)
    - Renderer (HTML & CSS)
  - Backend (Server)
    - The Full Stack
      - MERN stack (MondoDB, Express, React, NodeJS)
      - NodeJS is the top layer that faces the frontend
      - MongoDB is the bottom layer that manages data
      - React and Express are middle layer that add more easy-to-use functionalities to NodeJS
    - Rust, and Python offer effective middle layer languages for web development
  - 

# Week-1
[Top](#TOP)
## 2025-01-16
  - JavaScript is an event-driven programming language.
  - Write JavaScript code in a different section in the HTML page code usually in a script section <script>
  - We can put these JavaScript function in a '.js' file and embed these function in an HTML file with 
  ```js
  /* firstJsScript.js */
  function myFirstJsFunction(){ document.getElementById('example1').innerHTML = "Hello JavaScript!"; }
  ```

  ```html
  <!--- firstHtmlDoc.html --->
    
  <html>
    <body>
      <!--- Embedding JS Script files should be done inside containers --->
      <script src="firstJsScript.js"></script>
      <h2>What can JavaScript do?</h2>
      <p id="demo">JavaScript can change HTML content.</p>

      <!-- There are mouse-over, and mouse-click and many other events which can be used --->
      <button type="button" onclick=myFirstJsFunction()>Click Me!</button>
      
    </body>
  </html>
  ```
## 2025-01-14
  - Make sure all fields come with an ID, and name.
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My First HTML Page</title>
  </head>

  <body>
    <p>This is my first HTML page</p>
    
    <p>
      <i>This is the second line</i>
    </p>
    
    <p>
      <b>This is the third line</b>
    </p>
    
    <form id="formCustomerData">
      <label for="textNameOfCustomer">Name:</label>
      <input type="text" id="textNameOfCustomer" name="textbox" />
      <br />
      
      <label for="passwordPasswordOfCustomer">Password:</label>
      <input type="password" id="passwordPasswordOfCustomer" />
      <br />
      
      <input type="submit" id="buttonSubmitCustomerLogin" value="Submit" />
    </form>
    
    <button>Click</button>
  </body>
  </html>
  ```