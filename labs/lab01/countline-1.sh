#!/bin/bash

# Author: Spencer Baysinger
# Filename: countline.sh
# Created: 2025/01/29
# Updated: 2025/01/29
# Description: This script will count the number of lines in files.
# Usage: ./countline.sh {optional: path to file or directory}

# Initialize total line count
total_lines=0

# Check if an error file is specified; create it if necessary
error_file="error.txt"
> "$error_file"

# Function to count lines in a file
count_lines() {
  local file=$1
  if [[ -f $file ]]; then
    # Count the number of lines in the file
    local lines
    lines=$(wc -l < "$file" 2>> "$error_file") || {
      echo "Error reading file: $file" >> "$error_file"
      echo 0
      returnl
    }
    echo "$lines"
  else
    # If not a file, return 0 lines
    echo 0
  fi
}

# Iterate over all parameters (paths)
if [[ $# -eq 0 ]]; then
  # No parameters: count lines in all files in current directory
  for file in ./*; do
    if [[ -f $file ]]; then
      lines=$(count_lines "$file")
      if (( lines > 0 )); then
        total_lines=$((total_lines + lines + 1))
      fi
    fi
  done
else
  # If arguments are given, iterate over each parameter
  for path in "$@"; do
    if [[ -d $path ]]; then
      # If path is a directory, recurse over all files inside
      while IFS= read -r -d '' file; do
        lines=$(count_lines "$file")
        if (( lines > 0 )); then
          total_lines=$((total_lines + lines + 1))
        fi
      done < <(find "$path" -type f -print0)
    elif [[ -f $path ]]; then
      # If the path is a file, count its lines
      lines=$(count_lines "$path")
      if (( lines > 0 )); then
        total_lines=$((total_lines + lines + 1))
      fi
    else
      echo "Warning: '$path' is not a valid file or directory." >> "$error_file"
    fi
  done
fi

# Output the total line count
echo "-- Total Lines --"
echo $total_lines