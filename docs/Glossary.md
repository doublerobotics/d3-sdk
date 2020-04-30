# Glossary

#### Accessory Web View
This is a second fullscreen [Electron BrowserWindow](https://www.electronjs.org/docs/api/browser-window) that, by default, enables the security sandboxing features of Electron, so you can load in unknown content. It can also optionally be launched as "trusted", which disables some security features and preloads the socket connection to the d3 service, just like the Standby Screen. It can also be loaded with a transparent background, so you can use it as an in-call screen on top of the WebRTC video.

#### Commands
Your application (native or a custom standby screen) sends these to the d3 service. [See more](Communication.md)

#### D3 Service
This is the core Double 3 software. It runs as a system service via `systemctl`, which launches it on boot and ensures that it is always running.

#### Developer Mode
Developer mode on your Double 3 gives you complete root access to the Ubuntu 18.04 operating system. You can write your own apps, modify the configuration, and interact with the on-board d3 service. [See more](Developer%20Mode.md)

#### Events
Your application (native or a custom standby screen) receives these from the d3 service. [See more](Communication.md)

#### Standby Screen
This is the screen that is loaded on boot. It is an HTML page loaded in a fullscreen [Electron BrowserWindow](https://www.electronjs.org/docs/api/browser-window). You can completely replace the default standby screen with your own custom page. It has a preloaded global object that facilitates communication with the d3 service.
