# Developer Mode

Developer mode on your Double 3 gives you complete root access to the Ubuntu 18.04 operating system. You can modify the configuration and interact with the on-board core D3 software, which runs as a system service called "d3".

Developer mode disables the [default security features](Security.md). It also enables the Developer Monitor of your D3, which you can access via Chrome on your computer by visiting: http://YOUR_D3_IP:8080. You can find your D3's local IP by tapping the WiFi icon on the default standby screen.

## Entering Developer Mode

To enter developer mode, you must first link the D3 with your Double account, then email your head serial number to devteam@doublerobotics.com with a request to enable developer mode. After a security authorization, our team will enable developer mode and you will have complete root access.

## Exiting Developer Mode

You can exit developer mode by editing the startup file `/etc/d3/startup.json`. Set the `DEBUG_MODE` config parameter to be `false`, so the file looks something like this:

    {
       "config":{
          "DEBUG_MODE": false
       },
       "commands":[
          { "c": "events.server.enable" },
          { "c": "gui.enable" },
          { "c": "screensaver.allow" },
          { "c": "network.requestLocation" },
          { "c": "endpoint.enable", "delayMs": 2000 }
       ]
    }

**Before rebooting, make sure that you really want to exit developer mode. If you still want to have SSH access to your device, you must first [allow this port to pass through the firewall](Security.md).** Exiting developer mode will re-enable the firewall and disable the USB ports. To regain access to your device, you will need to contact Double Robotics again to request re-enabling developer mode.

Save the file and reboot.
