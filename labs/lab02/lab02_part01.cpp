// Author: Spencer Baysinger
// Filename: lab02_part01.cpp
// Created: 2025/02/16
// Updated: 2025/02/16
// Description: This is the lab02_part01.cpp file for the lab02 assignment.
// Usage: g++ lab02_part01.cpp -o lab02_part01.o

// *****************
// PART 1 QUESTIONS
// *****************
    // Question 1:  This file compiles and runs properly with no errors.

    // Question 2:  This file outputs 
    //              waiting...
    //              received an interrupt signal through Ctrl-C.
    //              Going to sleep.
    //              Notice the process is not exiting immediately
    //              Out of here.
    //              Now the process will terminate with the exit system call

    // Question 3:  The program waits for a signal to be sent to it. When the signal is sent, 
    //              the program will print out the message "received an interrupt signal through Ctrl-C." 
    //              Then the program will go to sleep for 1 second and print out the message "Going to sleep. 
    //              Notice the process is not exiting immediately." After the sleep, the program will print out the 
    //              message "Out of here." Finally, the program will terminate with the exit system call 
    //              and print out the message "Now the process will terminate with the exit system call."

#include <stdio.h>
#include <stdlib.h>
#include <signal.h>
#include <unistd.h>

void sigHandler (int);

int main() {
  signal (SIGINT, sigHandler);
  printf ("Waiting...\n");
  pause();

  return 0;
}

void sigHandler (int sigNum) {
  printf ("\nReceived an interrupt signal through Ctrl-C.\n");
  printf("Going to sleep. Notice the process is not exiting immediately\n");

  // This is where shutdown code would be inserted.

  sleep (1);
  printf ("Out of here.\n");
  printf("Now the process will terminate with the exit system call \n");
  
  exit(0);
}