# Software Updates

In Developer Mode, automatic software updates are __disabled__. There may be breaking changes in new updates. You can manually install updates from the Monitor > Dashboard tab in the left column by clicking "Check for Update", then the Install button, if an update is available.

We send out an email when each new D3 software update is available. Be sure that you've signed up for the (developer mailing list](https://www.doublerobotics.com/developer.html).

## System software via apt-get

We recommend that you do not automatically upgrade all system packages with apt-get, since breaking changes are possible. 

### E: dpkg was interrupted, you must manually run 'sudo dpkg --configure -a' to correct the problem.

If you experience this error when trying to install something with apt-get and the command above does not resolve it, you can try running this and trying to install again: 

    sudo rm /var/lib/dpkg/updates/*

The d3 service may restart.

### Don't upgrade [librealsense](https://github.com/IntelRealSense/librealsense)

It's important that you don't upgrade the system librealsense because there may be breaking changes. As of D3 software version 1.1.0, the supported version of librealsense is 2.41.0.

### Recovery

There is currently no way to "reset to factory" or install a new system image. It can only be done at our office in California. We hope to provide some way to do this in the field in the future, but we do not have a timeline for this. We recommend that you change the minimum number of settings and upgrade the minimum number of packages to accomplish your goals. If you do mess something up, email devteam@doublerobotics.com and we'll do our best to help you recover without sending the head back to us.
