# Console and Ubuntu Desktop

While in Developer Mode, you have root access to the system and you can access Ubuntu in standard ways.

## SSH

You can ssh to your robot's local IP. Unless you've changed the username or password, the default is "double" and the default password should have been emailed to you after our team switches your robot into developer mode.

For more secure access, we recommend setting up [key-based SSH login](https://help.ubuntu.com/community/SSH/OpenSSH/Keys).

## Writing Code on D3

The best way to develop on a D3 via your dev machine is to use the new [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview) feature. VS Code runs on your dev machine, but connects via SSH to your robot and enables you to edit files directly on the robot's drive. We use it internally and it works really well.

## Local Console

You can use an HDMI monitor and USB keyboard to access the console locally by switching to a different [TTY](https://askubuntu.com/questions/66195/what-is-a-tty-and-how-do-i-access-a-tty). However, this is not recommended.

1. Power on Double 3 and wait for it to boot.
2. Enable the USB ports via the Developer Monitor > Dashboard > Rear USB Ports > Enable
3. Plug in a USB keyboard and an HDMI monitor (must be after it booted).
4. Press `Ctrl` `Alt` `F1` and the console should appear on the HDMI monitor with a login prompt. Unless you've changed the username or password, the default is "double" and the default password should have been emailed to you after our team switches your robot into developer mode.
5. Press `Ctrl` `Alt` `F2` to get back to the standard Double 3 user interface.

## Ubuntu Desktop

We do not recommend switching the device into the Ubuntu Desktop mode. It is not supported.
