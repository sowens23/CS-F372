// Author: Spencer Baysinger
// Filename: lab02_part02.cpp
// Created: 2025/02/16
// Updated: 2025/02/17
// Description: This is the lab02_part02.cpp file for the lab02 assignment.
//              Program simulates a parent and child process communicating
//              via signals. The parent process forks a child, and the child
//              sends either SIGUSR1 or SIGUSR2 to the parent at random intervals.
//              The parent handles the signals and prints a message when it receives
//              SIGUSR1 or SIGUSR2. The parent also handles SIGINT (Ctrl-C) by
//              killing the child and then exiting gracefully.
// Usage: g++ lab02_part02.cpp -o lab02_part02.o

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <signal.h>
#include <time.h>
#include <sys/wait.h>

static pid_t child_pid = 0;  // Global so the parent can kill the child on Ctrl-C

// Forward declarations
void sigusr_handler(int sig);
void sigint_handler(int sig);

int main(void) {
  // Set up signal handlers in the parent
  // Note: Using signal() for simplicity. Alternatively, use sigaction().
  signal(SIGUSR1, sigusr_handler);
  signal(SIGUSR2, sigusr_handler);

  // Handle Ctrl-C (SIGINT) gracefully
  signal(SIGINT, sigint_handler);

  // Fork a child
  pid_t pid = fork();
  if (pid < 0) {
    perror("fork failed");
    exit(EXIT_FAILURE);
  }

  if (pid == 0) {
    // ---- CHILD PROCESS ----
    srand(time(NULL));  // Seed random number generator

    pid_t ppid = getppid(); // Parent's PID
    while (1) {
      // Sleep for 1-5 seconds
      int sleep_time = (rand() % 5) + 1;
      sleep(sleep_time);

      // Randomly pick SIGUSR1 or SIGUSR2
      int r = rand() % 2;
      int sig_to_send = (r == 0) ? SIGUSR1 : SIGUSR2;

      // Send signal to the parent
      kill(ppid, sig_to_send);
    }
    // Technically never reaches here unless child is killed
    exit(EXIT_SUCCESS);

  } else {
    // ---- PARENT PROCESS ----
    child_pid = pid;
    printf("Parent PID: %d, Child PID: %d\n", getpid(), child_pid);

    // Parent just waits for signals in an infinite loop
    // We use pause() so the parent sleeps until a signal is caught
    while (1) {
      pause(); 
      // pause() returns only when a signal handler completes
      // The parent then goes back to pause again, unless SIGINT terminates it
    }
  }

  return 0;
}

// Signal handler for SIGUSR1 and SIGUSR2
void sigusr_handler(int sig) {
  if (sig == SIGUSR1) {
    printf("Parent received SIGUSR1\n");
  } else if (sig == SIGUSR2) {
    printf("Parent received SIGUSR2\n");
  }
  // Reinstall signal handler if using older SysV semantics
  // (Some systems reset handler to default after it fires)
  signal(SIGUSR1, sigusr_handler);
  signal(SIGUSR2, sigusr_handler);
}

// Signal handler for Ctrl-C (SIGINT): kill child, wait, then exit
void sigint_handler(int sig) {
  printf("\nParent received SIGINT (Ctrl-C). Terminating child and exiting gracefully.\n");

  // Kill the child if it's still running
  if (child_pid > 0) {
    kill(child_pid, SIGTERM);
    // Wait for the child to exit
    int status;
    waitpid(child_pid, &status, 0);
    if (WIFEXITED(status)) {
      printf("Child exited with status %d\n", WEXITSTATUS(status));
    }
  }
  // Exit the parent
  exit(0);
}
