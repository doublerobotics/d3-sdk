# Console and Ubuntu Desktop

While in Developer Mode, you have root access to the system and you can access Ubuntu in standard ways.

## Local Console

You can use an HDMI monitor and USB keyboard to access the console locally by switching to a different [TTY](https://askubuntu.com/questions/66195/what-is-a-tty-and-how-do-i-access-a-tty).

1. Power on Double 3 and wait for it to boot.
2. Plug in a USB keyboard and an HDMI monitor (must be after it booted).
3. Press `Ctrl` `Alt` `F1` and the console should appear on the HDMI monitor with a login prompt. Unless you've changed the username or password, the default is "double" and the default password should have been emailed to you after our team switches your robot into developer mode.
4. Press `Ctrl` `Alt` `F2` to get back to the standard Double 3 user interface.

## SSH

You can ssh to your robot's local IP. Unless you've changed the username or password, the default is "double" and the default password should have been emailed to you after our team switches your robot into developer mode.

For more secure access, we recommend setting up [key-based SSH login](https://help.ubuntu.com/community/SSH/OpenSSH/Keys).

## Ubuntu Desktop

Double 3 normally boots into a custom system [target](https://manpages.ubuntu.com/manpages/bionic/man5/systemd.target.5.html) called d3.target, which starts the d3.service, which launches the compiz window manager – a lightweight window manager that basically just runs fullscreen apps, so no window borders. Technically, you can launch other GUI programs in that (for instance, from the Monitor > Terminal, you can run realsense-viewer and it will show on screen, although poorly).

If you're trying to launch a GUI application over ssh and getting a DISPLAY error, you may need to run:

    export DISPLAY=:0
    xhost +SI:localuser:root

You can switch Double 3 to boot into the standard Ubuntu desktop (gdm3) by changing the system target:

    sudo systemctl set-default graphical.target
    sudo reboot 

To get back to the d3 default:

    sudo systemctl set-default d3.target
    sudo reboot 

While in the Ubuntu desktop, you can launch the d3 service by running:

    sudo systemctl start d3

This may result in the D3 GUI taking over the screen or, if you have an HDMI monitor plugged in, displaying incorrectly. If you don't need the D3 GUI, you can remove the `gui.enable` entry from the `/etc/d3/startup.json` file and it won't launch the Electron GUI. Other things could still show on-screen on command, like the WebRTC video or the camera on-screen option.

We don't recommend using D3 in normal telepresence mode while running the Ubuntu Desktop, since there are likely to be some weird bugs. Desktop mode is useful for development or desktop GUI applications.

### Enable Touchscreen and USB ports in graphical.target

If you switch to graphical.target (gdm3 desktop), the rear USB ports and the touchscreen will not work by default. You need to set up the following helper service to do this.

Create the following text files in your `/home/double/` folder:

`/home/double/d3-helper.sh`:

    #!/bin/bash

    echo 486 > /sys/class/gpio/export
    echo 480 > /sys/class/gpio/export
    echo 0 > /sys/class/gpio/gpio486/value
    echo 0 > /sys/class/gpio/gpio480/value

    insmod /lib/modules/4.9.140+/kernel/drivers/input/touchscreen/goodix.ko

`/home/double/d3-helper.service`:

    [Unit]
    Description=D3 Desktop Driver Helper

    [Service]
    ExecStart=/home/double/d3-helper.sh

    [Install]
    WantedBy=graphical.target

Then run the following commands:

    sudo ln -s /home/double/d3-helper.service /etc/systemd/system/d3-helper.service
    sudo systemctl enable d3-helper

You'll also want to make sure the service called `enable-realsense` runs on startup, which it does by default. That will turn on the internal power to the RealSense devices.

## Writing Code on D3

Alternatively, an excellent way to develop on a D3 via your dev machine is to use the new [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview) feature. We use it internally and it works really well.
