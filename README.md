# Double 3 Developer SDK

Before accessing any developer features, your Double 3 will need to be [put into developer mode](docs/Developer%20Mode.md).

## Developer Monitor

The Developer Monitor allows you to view and control all of your Double's features from a web interface.  The Developer Monitor is a page hosted by an internal server on your D3.  

Open the Developer Monitor of your D3 in Chrome on your computer by visiting: http://YOUR_D3_IP:8080. You can find your D3's local IP by tapping the WiFi icon on the default standby screen.

## Hardware

Double 3 is powered by an Nvidia Jetson TX2-4GB System-on-Module connected to various built-in [sensors and devices](https://www.doublerobotics.com/tech-specs.html).  The hardware is similar to an Nvidia [Jetson TX2 Dev Kit](https://developer.nvidia.com/embedded/jetson-tx2-developer-kit) with added peripherals.

## Custom Applications

You can write and deploy your own custom code on your D3. The D3 head runs Ubuntu 18.04 on an Nvidia TX2-4GB module, so you can write code in any language that runs on that platform.

The core D3 software runs as a system service called `d3`. Your code will interact with this service by sending commands and receiving events. All commands and events are sent over a standard Unix domain socket. See more about [communicating with the D3 service](docs/Communicating.md).

#### HTML Applications

You can write an application in HTML and JavaScript and run it in the GUI module as a custom standby screen. You can set it to load on the D3 screen on boot. The GUI module runs an instance of Electron's BrowserWindow, which is essentially a Chromium web view window. Your application is not Electron-specific code, but just a standard web application. It has a preloaded global object that facilitates communication with the d3 service.

Most applications can be HTML applications. You have access to cameras, microphones, and the output of most sensors.

#### Native Applications

You can also write applications in any other language that will run on the device, such as Python, C++, or Go. However, you will need to manage launching your application on boot. If you choose to do this, you can disable the default GUI from launching on boot.

With a native application, you can get access to raw sensor data, such as direct access to the RealSense D435 depth sensors. You could also create a user interface using any GUI toolkit that you prefer.

## Examples

1. [standby-basic](examples/standby-basic) - This example shows the most basic usage of displaying a page on screen, sending commands via DRDoubleSDK and processing incoming events.
1. [standby-camera](examples/standby-camera) - This example shows how to set the output of the camera as a v4l2 source and show it on the D3 screen with `getUserMedia`.
1. [standby-webrtc](examples/standby-webrtc) - This example shows how to orchestrate a WebRTC call using a custom standby screen and the native WebRTC implementation that takes advantage of the hardware h264 encoder.

## Documentation

- [API.md](docs/API.md) lists all commands and events.
- [Communication.md](docs/Communication.md) describes the command and event JSON packet structures.
- [Developer Mode.md](docs/Developer%20Mode.md) describes entering and exiting developer mode.
- [Glossary.md](docs/Glossary.md) describes key terms used throughout this documentation.
- [Security.md](docs/Security.md) discusses security measures and how to maintain security when deploying.
- [Startup.md](docs/Startup.md) describes how to customize what runs on boot.
- [D3 System Diagram](system-diagram.pdf) shows how the hardware sensors, system daemons, GUI, and servers interconnect.

![D3 System Diagram](system-diagram-preview.png? "D3 System Diagram")

## Debug Monitor

When in developer mode, this tool is accessible over your local network to see and control what your D3 is doing. This tool uses the same [API commands](api.md) that you will use in your standby screen or native application to communicate with the D3 system.

![D3 Debug Monitor](monitor-preview.png "D3 Debug Monitor")
