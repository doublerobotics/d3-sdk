# Double 3 Developer SDK

First, your Double 3 will need to be [put into developer mode](docs/Developer%20Mode.md).

Open the Developer Monitor of your D3 in Chrome on your computer by visiting: http://YOUR_D3_IP:8080. You can find your D3's local IP by tapping the WiFi icon on the default standby screen.

The core D3 software runs as a system service called `d3`. Your code will interact with this service by sending commands and receiving events. All commands and events are sent over a standard Unix domain socket. See more about [communicating with the D3 service](docs/Communicating.md).

## Examples

1. [standby-basic](examples/standby-basic) - This example shows the most basic usage of displaying a page on screen, sending commands via DRDoubleSDK and processing incoming events.
1. [standby-camera](examples/standby-camera) - This example shows how to set the output of the camera as a v4l2 source and show it on the D3 screen with `getUserMedia`.
1. [standby-webrtc](examples/standby-webrtc) - This example shows how to orchestrate a WebRTC call using a custom standby screen and the native WebRTC implementation that takes advantage of the hardware h264 encoder.

## Documentation

- [API.md](docs/API.md) lists all commands and events.
- [Communication.md](docs/Communication.md) describes the command and event JSON packet structures.
- [Developer Mode.md](docs/Developer%20Mode.md) describes entering and exiting developer mode.
- [Security.md](docs/Security.md) discusses security measures and how to maintain security when deploying.
- [Startup.md](docs/Startup.md) describes how to customize what runs on boot.
- [D3 System Diagram](system-diagram.pdf) shows how the hardware sensors, system daemons, GUI, and servers interconnect.

![D3 System Diagram](system-diagram-preview.png? "D3 System Diagram")

## Debug Monitor

When in developer mode, this tool is accessible over your local network to see and control what your D3 is doing. This tool uses the same [API commands](api.md) that you will use in your standby screen or native application to communicate with the D3 system.

![D3 Debug Monitor](monitor-preview.png "D3 Debug Monitor")
