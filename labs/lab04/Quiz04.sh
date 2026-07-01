#!/bin/bash
# Author: Spencer Baysinger
# Quiz 04 - Linux File Systems and Permissions

# 1) Use chmod to modify permissions for a shell script so:
echo "# 1) Setting script permissions..."
chmod 755 myscript.sh


# 2) Create a FAT, NTFS, and EXT3 filesystem in separate files, then mount
echo "# 2) Creating mount points..."
sudo mkdir -p /mnt/myFat /mnt/myNTFS /mnt/myEXT3
echo "# Creating image files for each FS type..."
# Make a 64 MB empty file for each
dd if=/dev/zero of=fat.img bs=1M count=64
dd if=/dev/zero of=ntfs.img bs=1M count=64
dd if=/dev/zero of=ext3.img bs=1M count=64
echo "# Creating file systems..."
sudo mkfs.vfat  fat.img    # FAT
sudo mkfs.ntfs  ntfs.img   # NTFS (some distros use mkntfs)
sudo mkfs.ext3  ext3.img   # EXT3
echo "# Mounting those images on loop devices..."
# Associate each file with a loop device and mount
sudo mount -o loop fat.img  /mnt/myFat
sudo mount -o loop ntfs.img /mnt/myNTFS
sudo mount -o loop ext3.img /mnt/myEXT3


# 3) Use 'df' to test it
echo "# 3) Running df on newly mounted file systems:"
df -h | grep -E "myFat|myNTFS|myEXT3"


# 4) Create three different users: 'testuser1', 'testuser2', 'testuser3'
echo "# 4) Creating users..."
sudo useradd testuser1
sudo useradd testuser2
sudo useradd testuser3


# 5) Create a group called 'myfsuser'
echo "# 5) Creating a group named myfsuser..."
sudo groupadd myfsuser


# 6) Add the three users to 'myfsuser' group
echo "# 6) Adding the three users to myfsuser group..."
sudo usermod -a -G myfsuser testuser1
sudo usermod -a -G myfsuser testuser2
sudo usermod -a -G myfsuser testuser3


# 7) Set the permission of '/mnt/myFat' so only members of 'myfsuser' can access
echo "# 7) Changing ownership and permission on /mnt/myFat..."
# We can set the group ownership to 'myfsuser' and then remove access from others
sudo chgrp myfsuser /mnt/myFat
# e.g. 770 => rwx for owner, rwx for group, no perms for others
sudo chmod 770 /mnt/myFat


# 8) Write a shell script that checks if the current user has write permission
cat << 'EOF' > check_permissions.sh
#!/bin/bash

# This script checks the current user's write permission on myFat, myNTFS, myEXT3.

for dir in "/mnt/myFat" "/mnt/myNTFS" "/mnt/myEXT3"
do
  if [ -w "$dir" ]; then
    echo "You have write permission to $dir"
  else
    echo "You do NOT have write permission to $dir"
  fi
done
EOF

# Make it executable:
chmod +x check_permissions.sh
echo "# 8) Created check_permissions.sh to verify write permission on each filesystem"


# 9) Modify ~/.bashrc so user automatically sees the message right after login
echo "# 9) Adding check_permissions.sh to ~/.bashrc (for the current user)"
touch ~/.bashrc
echo "# Auto-check FS permissions after login:" >> ~/.bashrc
echo "$HOME/$(basename $(pwd))/check_permissions.sh" >> ~/.bashrc
echo "Done! Log out and back in (or run 'source ~/.bashrc') to see the check_permissions script output."


exit 0
