# Double 3 SDK WebRTC Example

[See documentation for Standby Apps](../../docs/Standby%20Apps.md)

This example shows how to orchestrate a WebRTC call on [Double 3](https://www.doublerobotics.com) using a custom standby screen and the native WebRTC implementation that takes advantage of the hardware h264 encoder. Your robot must be in developer mode.

The Glitch app creates a Node.js server that passes signaling. It also serves separate pages for the robot standby screen and the driver. Both pages connect to the server via WebSocket and pass the signals back and forth. The robot page assumes that the DRDoubleSDK javascript global object is loaded in the page, so it will work only on a Double 3.

Project page on Glitch: [https://glitch.com/~d3-webrtc-example](https://glitch.com/~d3-webrtc-example)

More documentation on github: [https://github.com/doublerobotics/d3-sdk](https://github.com/doublerobotics/d3-sdk)

## Getting Started

1. [Remix this on Glitch](https://glitch.com/edit/#!/remix/d3-webrtc-example), so you create your own app. Loading the shared version (d3-webrtc-example.glitch.me) onto your robot will expose your robot to anyone else who loads this page!
1. In the Glitch editor top bar, click Show > In a New Window to open this driver page on your computer.
3. Follow the instructions on that page

## Powered by [Glitch](https://glitch.com/)

**Glitch** is the friendly community where you'll build the app of your dreams. Glitch lets you instantly create, remix, edit, and host an app, bot or site, and you can invite collaborators or helpers to simultaneously edit code with you.

Find out more [about Glitch](https://glitch.com/about).

( ᵔ ᴥ ᵔ )