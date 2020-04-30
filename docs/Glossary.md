# Glossary

#### Accessory Web View
This is a second fullscreen [Electron BrowserWindow](https://www.electronjs.org/docs/api/browser-window) that, by default, enables the security sandboxing features of Electron, so you can load in unknown content. It can also optionally be launched as "trusted", which disables some security features and preloads the socket connection to the d3 service, just like the Standby Screen. It can also be loaded with a transparent background, so you can use it as an in-call screen on top of the WebRTC video.

#### Commands
Your application (native or a custom standby screen) sends these to the d3 service. [See more](Communication.md)

#### D3 Service
This is the core Double 3 software. It runs as a system service via `systemctl`, which launches it on boot and ensures that it is always running.

#### Developer Mode
Developer mode on your Double 3 gives you complete root access to the Ubuntu 18.04 operating system. You can write your own apps, modify the configuration, and interact with the on-board d3 service. [See more](Developer%20Mode.md)

#### Double 2
Double 2 and the first generation Double are previous version of the product, which used an iPad as the primary component of the head. There are SDKs available for [Basic Control](https://github.com/doublerobotics/Basic-Control-SDK-iOS) and the [Camera Kit](https://github.com/doublerobotics/Camera-Kit-SDK). These SDKs are not compatible with or very similar to Double 3.

#### Driver Interface
This generally refers to Double's driver clients on the web ([drive.doublerobotics.com](https://drive.doublerobotics.com)) and the [Double app for iOS](https://apps.apple.com/us/app/double/id589230178). The driver interfaces do not have many ways for developers to customize them. If you need a highly customized experience, you can build your own web service and driver interfaces, such as in our [standby-webrtc](../examples/standby-webrtc) example.

#### Endpoint
This is the section of the core d3 service that connects to Double's signaling servers to accept and facilitate calls from the driver interfaces. You can choose to disable this completely, if you're going to build your own servers or run autonomous applications locally. You can also keep the Endpoint enabled to allow users to call from the Double system, while still creating a custom standby screen that adds your own functionality to the device.

#### Events
Your application (native or a custom standby screen) receives these from the d3 service. [See more](Communication.md)

#### Fleet Management
This is an optional service that Double offers to customers for managing user access to Doubles, tracking call logs, creating visitor passes, and more. There are some developer features that are available in Fleet Management, such as access to your fleet's data via a REST API. [See more](https://www.doublerobotics.com/fleet-management.html)

#### Head
This is the top section of the robot with the screen. It contains the TX2 4GB module, cameras, microphones, depth sensors, ultrasonic sensors, and more. It draws power from the battery in the base. It is removable for shipping. Your code will run on the head.

#### Base
This is the bottom section of the robot that has the wheels, battery, kickstands, and includes the motorized pole. It is running a microcontroller and communicates with the head via a serial connection running inside the pole.

#### Standby Screen
This is the screen that is loaded on your Double 3's screen on boot. It is an HTML page loaded in a fullscreen [Electron BrowserWindow](https://www.electronjs.org/docs/api/browser-window). You can completely replace the default standby screen with your own custom page. It has a preloaded global object that facilitates communication with the d3 service.
