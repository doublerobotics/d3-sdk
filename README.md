# Double 3 Developer Examples

First, your Double 3 will need to be put into developer mode. Please contact support@doublerobotics.com to do this.

Open the Developer Monitor of your D3 in Chrome on your computer by visiting: http://YOUR_D3_IP:8080. You can find your D3's local IP by tapping the WiFi icon on the default standby screen.

## Examples

1. [standby-basic](standby-basic) - This example shows the most basic usage of displaying a page on screen, sending commands via DRDoubleSDK and processing incoming events.

## Documentation

- [api.md](api.md) lists all commands and events.
- [D3 System Diagram](system-diagram.pdf) shows how the hardware sensors, system daemons, GUI, and servers interconnect.

![D3 System Diagram](system-diagram-preview.png? "D3 System Diagram")

## Debug Monitor

When in developer mode, this tool is accessible over your local network to see and control what your D3 is doing. This tool uses the same [API commands](api.md) that you will use in your standby screen or native application to communicate with the D3 system.

![D3 Debug Monitor](monitor-preview.png "D3 Debug Monitor")
