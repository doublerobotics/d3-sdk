# Basic Standby Screen

Before accessing any developer features, your Double 3 will need to be [put into developer mode](../../docs/Developer%20Mode.md).

This page explains how to display a custom, interactive screen on your Double 3's touchscreen using HTML.

Open the Developer Monitor of your D3 in Chrome on your computer by visiting: ````http://YOUR_D3_IP:8080````. You can find your D3's local IP by tapping the WiFi icon on the default standby screen.

## Important – Reset Watchdog

For maximum reliability, the system will automatically reload your page when you fail to reset the watchdog fast enough. This is in case your code locks up or begins running too slowly. If it fails several times in a row, it will restart Electron and try your page again. You must send this command faster than every 3 seconds:

    DRDoubleSDK.resetWatchdog();

This is the equivalent of sending `DRDoubleSDK.sendCommand("gui.watchdog.reset")`. You could also disable the watchdog functionality altogether with the `gui.watchdog.disallow` command, but this is not recommended.

## Host Your Files

Upload the files from this example to a web server or launch a web server on your local computer. You can do that easily in a terminal by changing to this repository directory and [running a static web server](https://gist.github.com/willurd/5720255), such as:

python 2:

    python -m SimpleHTTPServer 8000

or python 3:

    python -m http.server 8000

Type the address of your web server (````http://YOUR_COMPUTER_IP:8000/````) into the Standby GUI input field and click the "Go" button.

![D3 Debug Monitor - Standby URL](monitor-standby-url.png "D3 Debug Monitor - Standby URL")

## Chrome DevTools

In order to easily debug your web application as it runs on your D3, you can open the Chrome DevTools on your local machine and debug it remotely.  To do this, first mark the Debug checkbox on the Debug Monitor, then Disable and re-Enable the Standby GUI. Now, in the Standby GUI section of your Debug Monitor, a link will appear, which will look something like: ````http://YOUR_D3_IP:5555````.  Click the link to open the Chrome DevTools on your local machine.  

### DevTools Screencast Bug

There is a bug in Chrome DevTools while the "screencast" feature is on (the default). Rendering on the remote device (D3 screen) sometimes does not update. We recommend turning off the screencast - click the phone/tablet devices icon. You can still refresh your target page by using the key command (i.e. cmd + R).

## Launching Your Standby Screen on Startup

You can set your URL to be the default standby screen with this command:

    api.setConfig
    {
      "key": "STANDBY_URL",
      "value": "https://d3.doublerobotics.com"
    }

Then reboot from the Monitor toolbar menu or send `system.reboot` or `system.restartService`. To reset it to the default, send:

    api.setConfig
    {
      "key": "STANDBY_URL",
      "value": null
    }

## Adding More Functionality

As you can see from this example, your new standby screen does not just have to be static HTML.  It can be a fully functioning web application using JavaScript, and your code can interface with your Double.  To discover all of the functionality, you can read more about [Communicating with your Double](../../docs/Communication.md) and browse the [API Documentation](../../docs/API.md) for a full list of commands and events.
