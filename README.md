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

# Week-1
[Top](#TOP)
## 2025-01-13
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