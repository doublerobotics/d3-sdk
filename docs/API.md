# D3 API
D3 Software Version: 1.1.3
## Commands
[api](#api), [base](#base), [calibration](#calibration), [camera](#camera), [depth](#depth), [dockTracker](#dockTracker), [documentation](#documentation), [endpoint](#endpoint), [events](#events), [gridManager](#gridManager), [gui](#gui), [imu](#imu), [mics](#mics), [navigate](#navigate), [network](#network), [pose](#pose), [ptz](#ptz), [speaker](#speaker), [screensaver](#screensaver), [system](#system), [tilt](#tilt), [ultrasonic](#ultrasonic), [updater](#updater), [webrtc](#webrtc)
### api
- api.requestStatus
  - event: `DRAPI.status`
- api.requestLocalConfiguration
  - event: `DRAPI.localConfiguration`
- api.requestRemoteConfiguration
  - event: `DRAPI.remoteConfiguration`
- api.setConfig
  - parameters: ```{
  "key": "STANDBY_URL",
  "value": "https://d3.doublerobotics.com"
}```
  - These values override the localConfiguration values. See possible values in Monitor > System > Local Configuration. You probably don't want to change any of them, except for the `STANDBY_URL`.
  - The values saved to disk in `/etc/d3/startup.json`. Restart service is required(`system.restartService`) for new values to take effect.
  - To delete key, send value null or don't include value at all.

### base
- base.kickstand.deploy
- base.kickstand.retract
  - event: `DRBase.kickstandAngleError` This event will fire if the kickstands cannot retract because the robot detects that it's leaning too far (either on a hill or kickstands previously did not deploy fully).
- base.pole.setTarget
  - parameters: ```{
  "percent": 1
}```
- base.pole.sit
- base.pole.stand
- base.pole.stop
- base.requestVersion
  - event: `DRBase.version`
- base.requestStatus
  - event: `DRBase.status`
- base.travel.start
  - event: `DRBase.travel` The travel data contains the wheel encoder data, both as number of ticks and inches of travel since last event. Note that the `DRPose.pose` event may be more useful, as it uses the encoder data to estimate the robot's current position in world coordinates.
- base.travel.stop
- base.turnBy
  - parameters: ```{
  "degrees": 0,
  "degreesWhileDriving": 0
}```
- other:
  - event: `DRBase.poleMotionStop` fires only if travel data is running.
event: `DRBase.poleMotionStart` fires only if travel data is running.
  - event: `DRBase.poleMotionStop` fires only if travel data is running.
event: `DRBase.poleMotionStart` fires only if travel data is running.

### calibration
- calibration.requestValues
  - event: `DRCalibration.values`

### camera
- camera.enable
  - parameters: ```{
  "width": 1152,
  "height": 720,
  "template": "screen",
  "gstreamer": "appsrc name=d3src ! autovideosink"
}```
  - Send only one of either `template` or `gstreamer`. Possible values for template:
    - `preheat` turns the camera on, but no output
    - `screen` shows on-screen using "nvoverlaysink"
    - `h264ForWebRTC` hardware encoding to h264 and publishes to the d3-webrtc binary
    - `v4l2` outputs to /dev/video9 and shows up as a webcam "D3_Camera" in Electron/Chromium
  - If the camera is already enabled, the size will not be changed, but the new output(`template` or`gstreamer`) will be applied.
- camera.disable
- camera.capturePhoto
- camera.graphics.enable
- camera.graphics.disable
- camera.graphics.setLevel
  - parameters: ```{
  "level": 2
}```
- camera.graphics.dots.setColor
  - parameters: ```{
  "r": 1,
  "g": 1,
  "b": 1,
  "a": 1
}```
- camera.graphics.dots.setColorIsAutomatic
- camera.hitTest
  - parameters: ```{
  "x": 0.5,
  "y": 0.5,
  "highlight": true
}```
  - event: DRCamera.hitResult
- camera.move.speed
  - parameters: ```{
  "x": 0,
  "y": 0,
  "zoom": 0
}```
- camera.move.stop
- camera.night.enable
- camera.night.disable
- camera.output
  - parameters: ```{
  "template": "h264ForWebRTC",
  "gstreamer": "appsrc name=d3src ! autovideosink",
  "width": 1152,
  "height": 720
}```
  - Send only one of either `template` or `gstreamer`. Possible values for template:
    - `screen` shows on-screen using "nvoverlaysink"
    - `h264ForWebRTC` hardware encoding to h264 and publishes to the d3-webrtc binary
    - `v4l2` outputs to /dev/video9 and shows up as a webcam "D3_Camera" in Electron/Chromium
- camera.setMaxFps
  - parameters: ```{
  "fps": 30
}```
- camera.zoom
  - parameters: ```{
  "sensor": 0,
  "zoom": 1,
  "x": 0,
  "y": 0,
  "updateRegion": true,
  "time": 0.5
}```
  - Sensor 0 (wide) or 1 (narrow), zoom is 1.0 - 4.0, x and y are -1.0 = 1.0, updateRegion crops exposure and white balance, animationLength is in seconds
  - Note: We recommend using ptz.* commands instead of camera.zoom directly.

### depth
- depth.floor.enable
- depth.front.enable
- depth.floor.disable
- depth.front.disable
- depth.floor.pause
- depth.front.pause
- depth.floor.resume
- depth.front.resume
- depth.floor.reset
- depth.front.reset
- depth.floor.detectors
  - parameters: ```{
  "columns": true,
  "grid": false
}```
- depth.front.detectors
  - parameters: ```{
  "frontGrid": true
}```
- depth.floor.setROI
  - parameters: ```{
  "left": 0,
  "right": 847,
  "top": 0,
  "bottom": 479
}```
- depth.front.setROI
  - parameters: ```{
  "left": 0,
  "right": 847,
  "top": 0,
  "bottom": 479
}```
- other:
  - event: `DRFloorDepth.frame`
event: `DRFrontDepth.frame`
  - event: `DRFloorDepth.frame`
event: `DRFrontDepth.frame`

### dockTracker
- dockTracker.enable
- dockTracker.disable
- dockTracker.clear
  - event: `DRDockTracker.clear`
- other:
  - event: `DRDockTracker.docks` fires repeatedly while docks are detected.

### documentation
- documentation.requestCommands
  - parameters: ```{
  "header": false,
  "links": true,
  "tableOfContents": true,
  "internal": false
}```
- documentation.requestEvents
- documentation.requestForGitHub

### endpoint

The endpoint represents the connection with Double's calling servers and driver clients. If you are building your own calling server and driver clients, then you can disable this or remove its entry from the default startup commands (`/etc/d3/startup.json`).
- endpoint.enable
- endpoint.disable
- endpoint.driverSidebar.sendMessage
  - parameters: ```{
  "message": {},
  "targetOrigin": "example.com"
}```
  - This command is in development, not stable, and could disappear.
  - For targetOrigin definition, see: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
- endpoint.requestIdentity
  - parameters: ```{
  "requestSetupLink": false
}```
  - event: `DREndpointModule.identity`
- endpoint.requestModuleStatus
  - event: `DREndpointModule.status`
- endpoint.requestOptions
  - event: `DREndpointModule.options`
- endpoint.requestStatusForDriver
  - event: `DREndpointModule.statusForDriver`
- endpoint.session.end
- endpoint.setOptions
  - parameters: ```{
  "allowDisablingObstacleAvoidance": false,
  "disablePhoto": false,
  "defaultToObstacleAvoidanceStop": false,
  "ignoreUltrasonic": false,
  "allowMicDuringPoleMotion": false,
  "minimumPerformanceModel": false,
  "hideVisitorPassButton": false,
  "defaultAudioBoostLevel": 0,
  "enableFloorDepthClipping": false,
  "playCallChimes": false
}```
  - All parameters are optional.
  - These options are saved to disk and are used at the beginning of a call from Double's driver clients.
- endpoint.unlinkIdentity
- other:
  - event: `DREndpointModule.sessionBegin`
event: `DREndpointModule.sessionEnd`
  - event: `DREndpointModule.sessionBegin`
event: `DREndpointModule.sessionEnd`

### events
- events.subscribe
  - parameters: ```{
  "events": [
    "DRBase.status"
  ]
}```
  - Subscribe to a specific event for it to be sent to your application when it happens.
  - You can subscribe to all events with "*", but this is not recommended because it's a firehose of data, with potentially hundreds of events per second.
- events.unsubscribe
  - parameters: ```{
  "events": [
    "DRBase.status"
  ]
}```

### gridManager

The gridManager handles the grid of dots that are shown on the floor in the mixed reality video stream.
- gridManager.enable
- gridManager.disable
- gridManager.clear
- gridManager.wipe
  - parameters: ```{
  "thickness": 0.1,
  "increment": 0.05,
  "ms": 20
}```
- other:
  - event: `DRGridManager.robotGrid` The `base64` value is a base64 string containing a zlib compressed javascript Uint8Array array of character codes with length 40000, representing the 200x200 m grid of drivable tiles. Each tile is 10x10 cm. The robot is always centered in this grid, but slightly offset (the `offset.x` and `offset.y` values). At each 10 cm interval of global movement, the entire grid moves by 10 cm and the offsets reset to 0. This gives the illusion that the tiles (dots) stick to the floor. Decode in JavaScript using [Pako](https://github.com/nodeca/pako) with: `var grid = Uint8Array.from(pako.inflate(new Uint8Array(atob(event.data.base64).split('').map(function (x) { return x.charCodeAt(0); }))));`

### gui

The gui represents the [Electron](https://github.com/electron/electron) instance that is shown on screen. Our system uses it for the standby screen, WiFi screen, in-call screen, and various in-call features. It does not show the incoming WebRTC video stream, though. The main gui window (standby window) is launched behind the WebRTC video, but the accessory web view is launched over the WebRTC video.

You can create your own standby screen as a web page or you can create your own native application and disable the gui or remove its entry from the default startup commands(`/etc/d3/startup.json`).
- gui.enable
  - parameters: ```{
  "standbyUrl": "https://d3.doublerobotics.com",
  "debug": false
}```
- gui.disable
- gui.accessoryWebView.close
- gui.accessoryWebView.hide
- gui.accessoryWebView.open
  - parameters: ```{
  "url": "https://www.doublerobotics.com",
  "trusted": false,
  "transparent": false,
  "backgroundColor": "#FFF",
  "keyboard": false
}```
  - Trusted means that Electron will load the window.DRDoubleSDK object, which is a channel to communicate with d3-api. This will give that web page access to all of the d3-api commands, so you should trust only your own URLs.
- gui.accessoryWebView.open.screenSharingReceive
- gui.accessoryWebView.message.to
- gui.accessoryWebView.message.from
- gui.accessoryWebView.reload
- gui.accessoryWebView.show
- gui.go.standby
  - parameters: ```{
  "url": "https://d3.doublerobotics.com"
}```
- gui.go.wifi
- gui.hide
- gui.message.to
- gui.message.from
- gui.show
- gui.watchdog.allow
- gui.watchdog.disallow
- gui.watchdog.reset
- other:
  - `DRGUI.accessoryWebView.close`
  - `DRGUI.accessoryWebView.hide`
  - `DRGUI.accessoryWebView.message.from`
  - `DRGUI.accessoryWebView.message.to`
  - `DRGUI.accessoryWebView.open`
  - `DRGUI.accessoryWebView.reload`
  - `DRGUI.accessoryWebView.show`
  - `DRGUI.message.from`
  - `DRGUI.message.to`
  - `DRGUI.standbyWatchdog`

### imu
- imu.enable
- imu.disable
- imu.pause
- imu.resume
- other:
  - `DRIMU.converge` fires after startup when the data becomes usable.
  - `DRIMU.imu` contains the quaternion from the IMU and fires up to 60 times per second.

### mics
- mics.setBoost
  - parameters: ```{
  "percent": 0.25
}```
- mics.requestStatus
  - event: `DRMics.status`

### navigate

Use the navigate commands to drive. Manual driving is done through `navigate.drive` and Click-to-Drive is done with `navigate.target`.
- navigate.enable
- navigate.disable
- navigate.cancelTarget
  - event: `DRNavigateModule.cancelTarget`
- navigate.drive
  - parameters: ```{
  "throttle": 0,
  "turn": 0,
  "powerDrive": false
}```
  - Throttle and turn are -1.0 - 1.0. Actual driving speed will be filtered by the obstacle avoidance module.
  - To maintain smooth driving, this command must be sent repeatedly (every 200ms is recommended) or it will default to stopping after the timeout (500ms).
- navigate.hitResult
  - parameters: ```{
  "hit": true,
  "x": 0,
  "y": 0,
  "z": 0
}```
  - Pass the data from the DRCamera.hitResult event after sending camera.hitTest to this command to automatically drive to the found position. If hit:false, no action will be taken.
- navigate.obstacleAvoidance.setLevel
  - parameters: ```{
  "level": 2
}```
  - 0 = Off, 1 = Slow and stop for obstacles, 2 = Divert around obstacles
- navigate.target
  - parameters: ```{
  "x": 0,
  "y": 0,
  "angleRadians": 0,
  "relative": true,
  "dock": false,
  "dockId": 0,
  "action": ""
}```
  - x/y units are in meters, x = forward/back, y = left/right
  - To dock, use `dock: forward` (backward is not supported) and pass dockId:XXXXXX
  - To undock, use: `action: exitDock`
  - angleRadians is the angle to end at, after reaching the target
  - x/y units are in meters, x = forward/back, y = left/right
To dock, use `dock: forward` (backward is not supported) and pass dockId:XXXXXX
To undock, use: `action: exitDock`
angleRadians is the angle to end at, after reaching the target
event: `DRNavigateModule.target`
- navigate.ultrasonic.ignore
- navigate.ultrasonic.avoid
- other:
  - `DRNavigateModule.arrive`

### network
- network.checkIfCaptivePortal
  - event: `DRNetwork.captiveResult`
- network.connections.request
  - event: `DRNetwork.connections`
- network.connections.reconnect
  - parameters: ```{
  "ssid": "My Network Name"
}```
- network.connections.delete
  - parameters: ```{
  "uuid": "xxxxxxxxxxxxxxxxxxxxxxxxx"
}```
- network.join
  - parameters: ```{
  "ssid": "",
  "password": "",
  "wifiSecKeyMgmt": "",
  "ipv4method": "",
  "eap": "",
  "phase2auth": "",
  "identity": "",
  "anonymousIdentity": "",
  "open": false,
  "forceCaptivePortal": false
}```
  - wifiSecKeyMgmt: optional. [none|ieee8021x|wpa-none|wpa-psk|wpa-eap] defaults to wpa-eap if other optional params are set, but this one is not set.
  - ipv4method: optional.  [auto|link-local|manual|shared|disabled]
  - eap: optional.  [leap|md5|tls|peap|ttls|sim|fast|pwd]
  - phase2auth: optional.  [pap|chap|mschap|mschapv2|gtc|otp|md5|tls]
  - identity: optional.  (WPA2 Ent. username)
  - anonymousIdentity: optional.  (802-1x.anonymous-identity)
  - wifiSecKeyMgmt: optional. [none|ieee8021x|wpa-none|wpa-psk|wpa-eap] defaults to wpa-eap if other optional params are set, but this one is not set.
ipv4method: optional.  [auto|link-local|manual|shared|disabled]
eap: optional.  [leap|md5|tls|peap|ttls|sim|fast|pwd]
phase2auth: optional.  [pap|chap|mschap|mschapv2|gtc|otp|md5|tls]
identity: optional.  (WPA2 Ent. username)
anonymousIdentity: optional.  (802-1x.anonymous-identity)
event: `DRNetwork.join`
event: `DRNetwork.joinError`
event: `DRNetwork.joinResult`
event: `DRNetwork.joinRetry`
  - wifiSecKeyMgmt: optional. [none|ieee8021x|wpa-none|wpa-psk|wpa-eap] defaults to wpa-eap if other optional params are set, but this one is not set.
ipv4method: optional.  [auto|link-local|manual|shared|disabled]
eap: optional.  [leap|md5|tls|peap|ttls|sim|fast|pwd]
phase2auth: optional.  [pap|chap|mschap|mschapv2|gtc|otp|md5|tls]
identity: optional.  (WPA2 Ent. username)
anonymousIdentity: optional.  (802-1x.anonymous-identity)
event: `DRNetwork.join`
event: `DRNetwork.joinError`
event: `DRNetwork.joinResult`
event: `DRNetwork.joinRetry`
  - wifiSecKeyMgmt: optional. [none|ieee8021x|wpa-none|wpa-psk|wpa-eap] defaults to wpa-eap if other optional params are set, but this one is not set.
ipv4method: optional.  [auto|link-local|manual|shared|disabled]
eap: optional.  [leap|md5|tls|peap|ttls|sim|fast|pwd]
phase2auth: optional.  [pap|chap|mschap|mschapv2|gtc|otp|md5|tls]
identity: optional.  (WPA2 Ent. username)
anonymousIdentity: optional.  (802-1x.anonymous-identity)
event: `DRNetwork.join`
event: `DRNetwork.joinError`
event: `DRNetwork.joinResult`
event: `DRNetwork.joinRetry`
  - wifiSecKeyMgmt: optional. [none|ieee8021x|wpa-none|wpa-psk|wpa-eap] defaults to wpa-eap if other optional params are set, but this one is not set.
ipv4method: optional.  [auto|link-local|manual|shared|disabled]
eap: optional.  [leap|md5|tls|peap|ttls|sim|fast|pwd]
phase2auth: optional.  [pap|chap|mschap|mschapv2|gtc|otp|md5|tls]
identity: optional.  (WPA2 Ent. username)
anonymousIdentity: optional.  (802-1x.anonymous-identity)
event: `DRNetwork.join`
event: `DRNetwork.joinError`
event: `DRNetwork.joinResult`
event: `DRNetwork.joinRetry`
- network.join.cancel
- network.requestActiveAP
  - event: `DRNetwork.scanActiveAP`
- network.requestInfo
  - event: `DRNetwork.info`
- network.requestLocation
  - event: `DRNetwork.location`
- network.requestScan
  - parameters: ```{
  "rssi": false
}```
  - event: `DRNetwork.scan`
- network.requestState
  - event: `DRNetwork.state`
- network.reset
- network.setBgscan
  - parameters: ```{
  "value": "simple:30:-65:300"
}```
  - This value is used until the d3 service restarts or operating system is rebooted. This can also be set with startup.json config "BGSCAN_DEFAULT".
  - [bgscan docs](https://wiki.archlinux.org/index.php/wpa_supplicant#Roaming)
- other:
  - `DRNetwork.apDisconnect`
  - `DRNetwork.bandwidth`
  - `DRNetwork.connect`
  - `DRNetwork.connecting`
  - `DRNetwork.disconnect`
  - `DRNetwork.hop`
  - `DRNetwork.hopSignal`
  - `DRNetwork.monitorLog`
  - `DRNetwork.networkError`
  - `DRNetwork.rejoin`
  - `DRNetwork.rejoinError`
  - `DRNetwork.rejoinRetry`
  - `DRNetwork.reset`
  - `DRNetwork.resetAfterBoot`
  - `DRNetwork.resetError`
  - `DRNetwork.signal`
  - `DRNetwork.state`
  - `DRNetworkChecker.result`

### pose
- pose.pause
- pose.requestModel
  - event: `DRPose.model`
- pose.resetOrigin
  - event: `DRPose.resetOrigin`
- pose.resume
- other:
  - `DRPose.pose` is fired continuously as the robot's pose changes. It includes both an estimate of the base's position in world coordinates based on the wheel encoder data and the head's position based on the IMU data and knowledge of the robot's model and degrees of freedom.

### ptz

Use these commands to pan, tilt, and zoom around the video stream. It combines the tilt motor, wheels, and both camera sensors.
- ptz.in
  - parameters: ```{
  "by": 1,
  "time": 0.5,
  "x": 0,
  "y": 0
}```
  - by is a positive integer stepping through preset zoom levels: 1, 1.33, 2, 2.95 (narrow camera starts to show), 6, 12
  - time is seconds
  - x and y are both -1.0 to 1.0, as percentages of the current viewport, with the center being 0,0.
- ptz.move
  - parameters: ```{
  "x": 0,
  "y": 0,
  "zoom": 0
}```
  - x and y are both -1.0 to 1.0, as percentages of the maximum speed.
  - This must be sent repeatedly (faster than every 200 ms) to continue moving.
- ptz.out
  - parameters: ```{
  "by": 1,
  "time": 0.5
}```
  - by is a positive integer stepping through preset zoom levels: 1, 1.33, 2, 2.95 (narrow camera starts to show), 6, 12
  - speed is seconds
- ptz.requestStatus
  - event: `DRPTZModule.status`
- ptz.reset
- ptz.stop

### speaker
- speaker.enable
- speaker.disable
- speaker.requestVolume
  - event: `DRSpeaker.volume`
- speaker.setVolume
  - parameters: ```{
  "percent": 1
}```

### screensaver

The screensaver turns the LCD backlight off based on inactivity. You can call screensaver.nudge at any time to let it know that there's activity happening (similar to typing on a keyboard on a computer). Internally, the center ultrasonic sensor is used to detect if there is an something near to the screen and nudges the screensaver.
- screensaver.allow
  - parameters: ```{
  "seconds": 120
}```
- screensaver.hide
- screensaver.nudge
- screensaver.prevent
- screensaver.requestStatus
  - event: `DRScreensaver.status`
- screensaver.show
- other:
  - `DRScreensaver.allow`
  - `DRScreensaver.hide`
  - `DRScreensaver.prevent`
  - `DRScreensaver.show`

### system
- system.enableRearUSBPorts
- system.disableRearUSBPorts
- system.requestDiskSpace
  - event: `DRSystem.checkDiskSpace`
- system.requestInfo
  - event: `DRSystem.info`
- system.requestScreenshot
  - event: `DRSystem.screenshot`
- system.reboot
- system.requestPerformanceModel
  - event: `DRSystem.performanceModel`
event: `DRSystem.performanceModelError`
event: `DRSystem.performanceModelSuccess`
  - event: `DRSystem.performanceModel`
event: `DRSystem.performanceModelError`
event: `DRSystem.performanceModelSuccess`
  - event: `DRSystem.performanceModel`
event: `DRSystem.performanceModelError`
event: `DRSystem.performanceModelSuccess`
- system.screen.setBrightness
  - parameters: ```{
  "percent": 0.7,
  "fadeMs": 500
}```
  - event: `DRSystem.brightness`
event: `DRSystem.brightnessFadeComplete`
  - event: `DRSystem.brightness`
event: `DRSystem.brightnessFadeComplete`
- system.setPerformanceModel
  - parameters: ```{
  "name": ""
}```
  - Values for `name`: lowest, low, high, highest
  - This sets the underlying clock speeds of the system using Nvidia's nvpmodel and jetson_clocks tools.
  - This is important to set if your code uses significant CPU or GPU. Our code is optimized to run on the lowest performance model during a standard call to use less battery.
- system.shutdown
  - event: `DRSystem.shutdown`
- system.tegrastats.enable
  - event: `DRSystem.tegrastats`
event: `DRSystem.tegrastatsError`
  - event: `DRSystem.tegrastats`
event: `DRSystem.tegrastatsError`
- system.tegrastats.disable

### tilt

This moves the motor for the cameras. You probably want to use the ptz commands instead.
- tilt.enable
- tilt.disable
- tilt.default
- tilt.move
  - parameters: ```{
  "speed": 0
}```
  - Speed is -1.0 (tilt up full speed) to 1.0 (tilt down full speed), with 0.0 being stop.
  - To maintain smooth motion, this command must be sent repeatedly (every 200ms is recommended) or it will default to stopping after the timeout (500ms).
  - We recommend that you use the ptz.* commands instead, since they automatically unify the tilt motor and camera pan.
- tilt.stop
- tilt.target
  - parameters: ```{
  "percent": 1
}```
  - Percent range is 0.0 - 1.0, with 0.0 being tilted up and 1.0 tilted down.
- other:
  - `DRMotor.willStart`
  - `DRMotor.start`
  - `DRMotor.stop`
  - `DRMotor.position`
  - `DRMotor.arrive`

### ultrasonic
- ultrasonic.enable
- ultrasonic.disable
- ultrasonic.start
  - parameters: ```{
  "pattern": [
    2,
    0,
    4,
    2,
    1,
    3
  ],
  "delay": 10,
  "dump": false
}```
  - event: `DRUltrasonic.startCycle`
- ultrasonic.stop
  - event: `DRUltrasonic.stopCycle`
- other:
  - `DRUltrasonic.measurement` is fired each time a new sensor is read.

### updater
- updater.base.installHex
- updater.base.update
  - parameters: ```{
  "url": "",
  "version": 29,
  "dev": false
}```
  - All parameters are optional; send only one or none.
  - Warning: installing a base firmware version that is not compatible with D3 could make your robot inoperable.
- updater.deb.install
  - parameters: ```{
  "path": ""
}```
- updater.deb.installRemote
  - parameters: ```{
  "url": ""
}```
- other:
  - `DRUpdater.downloaded`
  - `DRUpdater.installDebBegin`
  - `DRUpdater.installDebRemoteDownload`
  - `DRUpdater.installDebRemoteDownloadBegin`
  - `DRUpdater.installDebRemoteError`

### webrtc

This runs a native binary that uses hardware video encoding to save battery life and achieve HD resolutions at 30 fps. The binary is based on [Google's open source WebRTC](https://webrtc.org/) code. See [our WebRTC example](https://github.com/doublerobotics/d3-sdk/tree/master/examples/standby-webrtc) for how to interact with this to implement your own driver client with this video stream.
- webrtc.enable
  - parameters: ```{
  "servers": [
    {
      "urls": "stun:rtc.doublerobotics.com"
    }
  ],
  "transportPolicy": "all",
  "manageCamera": false
}```
  - The servers parameter is optional. It will default to Double's servers.
- webrtc.disable
- webrtc.setMicrophoneVolume
  - parameters: ```{
  "percent": 1
}```
- other:
  - `DRWebRTC.stats`

Documentation Generated: 2021-02-20 21:08:41
