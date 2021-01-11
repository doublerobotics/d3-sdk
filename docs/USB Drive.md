# Disk Space and External USB Drive

Disk space on the TX2 4GB is limited (14 GB total and only 1 GB free, by default). There are some pre-installed packages that could be deleted, but it still will not gain you very much space. An external USB 3.1 Flash Drive can solve this, but you need to ensure that it has the right filesystem and is mounted with the right priviledges to be able to build and execute your code.

## Format as ext4

__This will delete all files on the drive!__

If it already has a filesystem and the disk was automatically mounted, first unmount it with `umount` (note no "n"):

    df -h  # Check if the disk is mounted
    sudo umount /dev/sda1

Which file system is my USB drive?

    df -T

Find the device path for your drive (usually find it by storage size), such as `/dev/sda`, and create a partition (__This will delete all files on the drive!__):

    sudo fdisk /dev/sda

Create a file system (unmount using umount first):

    sudo mkfs.ext4 /dev/sda1

## Mount the USB Drive

    sudo fdisk -l  # list all disks
    sudo mkdir /media/usbstick  # can be any name
    sudo mount /dev/sda1 /media/usbstick -o rw,double,umask=000,nosuid,nodev,nofail,x-gvfs-show,user,exec
    sudo chmod 1777 /media/usbstick

You'll need to run the `mount` command each time you plug in the USB drive. If you attempt to set it to mount automatically on startup, make sure that you have the `nofail` option set or your system will not boot when the drive is not plugged in.

Inspect Usage:

    df -h

## Unmount

    sudo umount /dev/sda1
