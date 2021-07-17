# D3 API Commands and Events

Send commands from your application to interact with the system. [See examples on GitHub](https://github.com/doublerobotics/d3-sdk).

D3 Software Version: 1.3.1

## About Events
Some commands trigger specific events (noted under each command), but events can be sent at any time automatically by the system. In most cases, when a value changes in a status-type packet, that event will be fired automatically. Some events are sent continuously, such as the pose, since they are continuously changing.

Subscribe to events (see events section below) from your application. By default, no events are sent.

## Commands
[api](#api), [base](#base), [bluetooth](#bluetooth), [calibration](#calibration), [camera](#camera), [depth](#depth), [dockTracker](#dockTracker), [documentation](#documentation), [endpoint](#endpoint), [events](#events), [gridManager](#gridManager), [gui](#gui), [imu](#imu), [mics](#mics), [navigate](#navigate), [network](#network), [pose](#pose), [ptz](#ptz), [speaker](#speaker), [screensaver](#screensaver), [system](#system), [tilt](#tilt), [ultrasonic](#ultrasonic), [updater](#updater), [webrtc](#webrtc)

### api
- api.requestStatus
  - event: `DRAPI.status`
- api.requestLocalConfiguration
  - event: `DRAPI.localConfiguration` `APP_VERSION` is the currently installed software version.
- api.requestRemoteConfiguration
  - event: `DRAPI.remoteConfiguration` `d3_app_version` is the latest available software version. `d3_app_deb` is the URL of the deb file to install. Pass that URL to `updater.deb.installRemote` to install the update.
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
  - `degrees` is required
- other:
  - event: `DRBase.poleMotionStop` fires only if travel data is running.
  - event: `DRBase.poleMotionStart` fires only if travel data is running.

### bluetooth
- bluetooth.enable
  - The enabled state is automatically saved with the endpoint options across boots.
  - event: `DRBluetooth.enable`
  - event: `DRBluetooth.enableError`
- bluetooth.cancelScan
  - Cancel an active scan.
- bluetooth.disable
  - event: `DRBluetooth.disable`
- bluetooth.requestList
  - List paired devices.
  - event: `DRBluetooth.list`
- bluetooth.requestScan
  - parameters: ```{
  "timeout": 15000
}```
  - Scan for new devices.
  - `timeout` is the time limit in milliseconds. (optional)
  - event: `DRBluetooth.scan`
- bluetooth.pair
  - parameters: ```{
  "mac": "XX:XX:XX:XX:XX:XX",
  "timeout": 8000
}```
  - You must run a scan first.
  - `mac` is the MAC address from the scan result.
  - `timeout` is the time limit in milliseconds. (optional)
  - event: `DRBluetooth.pair`
- bluetooth.unpair
  - parameters: ```{
  "mac": "XX:XX:XX:XX:XX:XX"
}```
  - `mac` is the MAC address from the list.
- bluetooth.unpairAll
- other:
  - event: `DRBluetooth.connect` device connected
  - event: `DRBluetooth.disconnect` device disconnected

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
  - `width` and `height` native sizes are 1152x720 or 1728x1080. For other sizes, video will be scaled and/or cropped. (optional)
  - Send only one of either `template` or `gstreamer`.
  - `template` possible values (one string or an array of strings for multiple outputs):
    - `preheat` turns the camera on, but no output (not valid for multiple outputs)
    - `screen` shows on-screen using "nvoverlaysink"
    - `h264ForWebRTC` hardware encoding to h264 and publishes to the d3-webrtc binary
    - `v4l2` outputs to /dev/video9 and shows up as a webcam "D3_Camera" in Electron/Chromium
    - Note: When sending an array of outputs, only native sizes are possible.
  - `reset` will reset the template/gstreamer output (optional)
- camera.disable
- camera.capturePhoto
  - event: `DRCamera.photo`
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
  "highlight": true,
  "passToNavigate": false
}```
  - `x` and `y` are normalized coordinates on the video frame (percentage across the screen, with 0.5, 0.5 being the center). 0, 0 is the top left. 1, 1 is the bottom right.
  - `highlight` will flash a transparent circle over a dock icon or QR code icon, if it hits.
  - `passToNavigate` will automatically send the hit result to the navigate.hitResult command, meaning that it will take action to drive to the target, enter the dock, click the QR code icon, or do nothing at all, if nothing active is found on the hit test.
  - event: `DRCamera.hitResult`
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
  "height": 720,
  "reset": false
}```
  - `width` and `height` native sizes are 1152x720 or 1728x1080. For other sizes, video will be scaled and/or cropped. (optional)
  - Send only one of either `template` or `gstreamer`.
  - `template` possible values (one string or an array of strings for multiple outputs):
    - `preheat` turns the camera on, but no output
    - `screen` shows on-screen using "nvoverlaysink"
    - `h264ForWebRTC` hardware encoding to h264 and publishes to the d3-webrtc binary
    - `v4l2` outputs to /dev/video9 and shows up as a webcam "D3_Camera" in Electron/Chromium
    - Note: When sending an array of outputs, only native sizes are possible.
  - `reset` will reset the template/gstreamer output (optional)
- camera.setMaxFps
  - parameters: ```{
  "fps": 30
}```
- camera.tagDetector.enable
  - parameters: ```{
  "format": "QRCode",
  "interval": 1,
  "tryHarder": true,
  "tryRotate": true,
  "binarizer": "LocalAverage",
  "gpuBinarizer": 2,
  "windowSize": 1000,
  "windowOverlap": 200,
  "anyTag": true,
  "tags": [
    {
      "content": "example.com",
      "action": "newTabLink",
      "shape": "info",
      "size": 0.085,
      "red": 1,
      "green": 0,
      "blue": 0
    }
  ]
}```
  - `anyTag` is if the system should detect any tag it finds or just ones in the `tags` array.
  - `tags` is an array of objects representing the tags you want to detect and each one's attributes.
  - `content` is the value of the tag's data and the primary key identifying the tag.
  - `shape` is one of: info, disc, star, heart
  - `action` is one of: newTabLink, sidebarLink, sidebarApp, text
  - `size` is the width (and height) of the physical QR code in meters.
  - `red`, `green`, and `blue` set the color of the shape icon (0.0 - 1.0)
  - event: `DRCamera.tag`
- camera.tagDetector.disable
- camera.zoom
  - parameters: ```{
  "sensor": 0,
  "zoom": 1,
  "x": 0,
  "y": 0,
  "updateRegion": true,
  "time": 0.5
}```
  - Sensor 0 (wide) or 1 (narrow), zoom is 1.0 - 4.0, x and y are -1.0 - 1.0, updateRegion crops exposure and white balance, animationLength is in seconds
  - Note: We recommend using ptz.* commands instead of camera.zoom directly.

### depth
- depth.floor.enable
  - parameters: ```{
  "preset": "default",
  "recentFrames": 6
}```
- depth.front.enable
  - parameters: ```{
  "preset": "default",
  "recentFrames": 2
}```
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
  - event: `DRFrontDepth.frame`

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
  - event: `DRDocumentation.commands`

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
  - For `targetOrigin` definition, see [postMessage on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
  - event: `DREndpointModule.messageToDriverSidebar`
  - event: `DREndpointModule.messageFromDriverSidebar`
- endpoint.driverSidebar.start
  - parameters: ```{
  "name": "Example",
  "version": "1.0.0",
  "description": "Lorem ipsum",
  "sidebar": {
    "url": "https://example.com/sidebar.html",
    "startOpen": true,
    "allow": ""
  },
  "accessoryWebView": {
    "url": "https://example.com/d3.html",
    "trusted": true,
    "transparent": true
  },
  "xClassName": "lighten",
  "performanceModel": "lowest"
}```
  - See [In-Call Sidebar App documentation on GitHub](https://github.com/doublerobotics/d3-sdk/blob/master/docs/Sidebar.md)
- endpoint.driverSidebar.stop
- endpoint.requestIdentity
  - parameters: ```{
  "requestSetupLink": false
}```
  - event: `DREndpointModule.status`
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
  "playCallChimes": false,
  "enableTagDetector": false,
  "defaultSpeakerVolume": 0.67,
  "skipRetractKickstand": false,
  "disableTiltMinLimit": false,
  "lowQualityOnly": false,
  "disableApp_multiviewer": false,
  "disableApp_screensharing": false,
  "disableApp_webpage": false,
  "disableApp_text": false,
  "disableApp_satellite": false,
  "disableApp_zoom": false,
  "enableBluetooth": false
}```
  - All parameters are optional.
  - These options are saved to disk and are used at the beginning of a call from Double's driver clients.
- endpoint.setQualityPreference
- endpoint.resetToLastQualityPreference
- endpoint.unlinkIdentity
- other:
  - event: `DREndpointModule.sessionBegin`
  - event: `DREndpointModule.sessionEnd`

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
  - event: `DRGUI.accessoryWebView.close`
- gui.accessoryWebView.hide
  - event: `DRGUI.accessoryWebView.hide`
- gui.accessoryWebView.open
  - parameters: ```{
  "url": "https://www.example.com",
  "trusted": false,
  "transparent": false,
  "backgroundColor": "#FFF",
  "keyboard": false,
  "hidden": false
}```
  - Trusted means that Electron will load the window.DRDoubleSDK object, which is a channel to communicate with d3-api. This will give that web page access to all of the d3-api commands, so you should trust only your own URLs.
  - event: `DRGUI.accessoryWebView.open`
- gui.accessoryWebView.open.screenSharingReceive
- gui.accessoryWebView.message.to
  - parameters: ```{
  "hello": "world"
}```
  - The parameters can be any custom JSON object.
  - event: `DRGUI.accessoryWebView.message.to`
- gui.accessoryWebView.message.from
  - parameters: ```{
  "hello": "world"
}```
  - The parameters can be any custom JSON object.
  - event: `DRGUI.accessoryWebView.message.from`
- gui.accessoryWebView.reload
  - event: `DRGUI.accessoryWebView.reload`
- gui.accessoryWebView.show
  - event: `DRGUI.accessoryWebView.show`
- gui.go.standby
  - parameters: ```{
  "url": "https://d3.doublerobotics.com"
}```
- gui.go.wifi
- gui.hide
- gui.message.to
  - event: `DRGUI.message.to`
- gui.message.from
  - event: `DRGUI.message.from`
- gui.show
- gui.watchdog.allow
- gui.watchdog.disallow
- gui.watchdog.reset
- other:
  - event: `DRGUI.standbyWatchdog`
  - event: `DRGUI.standbyWatchdogRelaunch`
  - event: `DRGUI.standbyWatchdogResolved`

### imu
- imu.enable
- imu.disable
- imu.pause
- imu.resume
- other:
  - event: `DRIMU.converge` fires after startup when the data becomes usable.
  - event: `DRIMU.imu` contains the quaternion from the IMU and fires up to 60 times per second.

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
  "powerDrive": false,
  "disableTurn": false
}```
  - Throttle and turn are -1.0 - 1.0. Actual driving speed will be filtered by the obstacle avoidance module.
  - To maintain smooth driving, this command must be sent repeatedly (every 200ms is recommended) or it will default to stopping after the timeout (500ms).
- navigate.exitDock
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
- navigate.requestStatus
  - event: `DRNavigateModule.status`
- navigate.stop
  - This is the equivalent of sending `navigate.cancelTarget` and `navigate.drive { throttle: 0, turn: 0 }`.
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
  - event: `DRNavigateModule.target`
- navigate.ultrasonic.ignore
- navigate.ultrasonic.avoid
- other:
  - event: `DRNavigateModule.arrive`
  - event: `DRObstacleAvoidance.level`
  - event: `DRObstacleAvoidance.cancelDiversion`
  - event: `DRObstacleAvoidance.modifyDriveControls`

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
  - event: `DRNetwork.join`
  - event: `DRNetwork.joinError`
  - event: `DRNetwork.joinResult`
  - event: `DRNetwork.joinRetry`
- network.join.cancel
- network.requestActiveAP
  - event: `DRNetwork.scanActiveAP`
- network.requestInfo
  - event: `DRNetwork.info`
  - event: `DRNetwork.infoError`
- network.requestLocation
  - event: `DRNetwork.location`
- network.requestMac
  - event: `DRNetwork.mac`
  - event: `DRNetwork.macError`
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
  - This value is used until the d3 service restarts or operating system is rebooted. This can also be set with `api.setConfig` `BGSCAN_DEFAULT`.
  - [bgscan docs](https://wiki.archlinux.org/index.php/wpa_supplicant#Roaming)
- other:
  - event: `DRNetwork.apDisconnect`
  - event: `DRNetwork.bandwidth`
  - event: `DRNetwork.connect`
  - event: `DRNetwork.connecting`
  - event: `DRNetwork.disconnect`
  - event: `DRNetwork.hop`
  - event: `DRNetwork.hopSignal`
  - event: `DRNetwork.monitorLog`
  - event: `DRNetwork.rejoin`
  - event: `DRNetwork.rejoinError`
  - event: `DRNetwork.rejoinRetry`
  - event: `DRNetwork.reset`
  - event: `DRNetwork.resetAfterBoot`
  - event: `DRNetwork.resetError`
  - event: `DRNetwork.signal`
  - event: `DRNetwork.state`
  - event: `DRNetworkChecker.result`

### pose
- pose.pause
- pose.requestModel
  - event: `DRPose.model`
- pose.resetOrigin
  - event: `DRPose.resetOrigin`
- pose.resume
- other:
  - event: `DRPose.pose` is fired continuously as the robot's pose changes. It includes both an estimate of the base's position in world coordinates based on the wheel encoder data and the head's position based on the IMU data and knowledge of the robot's model and degrees of freedom.
  - event: `DRPose.yawRateProblem` is fired when a difference is detected between the turning rate (yaw of the base) as measured by the wheel encoders and the head IMU. If this happens, the robot will automatically stop in place, attempt to resolve the problem by recalibrating, then resume.
  - event: `DRPose.yawRateGood` is fired when the problem is resolved.

### ptz

Use these commands to pan, tilt, and zoom around the video stream. It combines the tilt motor, wheels, and both camera sensors.
- ptz.in
  - parameters: ```{
  "by": 1,
  "time": 0.5,
  "x": 0,
  "y": 0
}```
  - `by` is a positive integer stepping through preset zoom levels: 1, 1.33, 2, 2.95 (narrow camera starts to show), 6, 12
  - `time` is seconds
  - `x` and `y` are both -1.0 to 1.0, as percentages of the current viewport, with the center being 0,0.
- ptz.move
  - parameters: ```{
  "x": 0,
  "y": 0,
  "zoom": 0
}```
  - `x` and `y` are both -1.0 to 1.0, as percentages of the maximum speed.
  - This must be sent repeatedly (faster than every 200 ms) to continue moving.
- ptz.out
  - parameters: ```{
  "by": 1,
  "time": 0.5
}```
  - `by` is a positive integer stepping through preset zoom levels: 1, 1.33, 2, 2.95 (narrow camera starts to show), 6, 12
  - `speed` is seconds
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
  - event: `DRScreensaver.allow`
  - event: `DRScreensaver.hide`
  - event: `DRScreensaver.prevent`
  - event: `DRScreensaver.show`

### system
- system.enableRearUSBPorts
- system.disableRearUSBPorts
- system.requestDiskSpace
  - event: `DRSystem.diskSpace`
  - event: `DRSystem.checkDiskSpace` (deprecated)
- system.requestInfo
  - event: `DRSystem.systemInfo`
- system.requestScreenshot
  - event: `DRSystem.screenshot`
- system.reboot
- system.requestPerformanceModel
  - event: `DRSystem.performanceModel`
  - event: `DRSystem.performanceModelError`
  - event: `DRSystem.performanceModelSuccess`
- system.screen.setBrightness
  - parameters: ```{
  "percent": 0.7,
  "fadeMs": 500
}```
  - event: `DRSystem.brightness`
  - event: `DRSystem.brightnessFadeComplete`
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
  - event: `DRSystem.tegrastatsError`
- system.tegrastats.disable

### tilt

This moves the motor for the cameras. You probably want to use the ptz commands instead.
- tilt.enable
- tilt.disable
- tilt.default
- tilt.minLimit.enable
- tilt.minLimit.disable
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
  - event: `DRMotor.willStart`
  - event: `DRMotor.start`
  - event: `DRMotor.stop`
  - event: `DRMotor.position`
  - event: `DRMotor.arrive`

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
  - event: `DRUltrasonic.measurement` is fired each time a new sensor is read.

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
  - Get the latest deb from `api.requestRemoteConfiguration`
- other:
  - event: `DRUpdater.downloaded`
  - event: `DRUpdater.firmwareAvailable`
  - event: `DRUpdater.installDebBegin`
  - event: `DRUpdater.installDebRemoteDownload`
  - event: `DRUpdater.installDebRemoteDownloadBegin`
  - event: `DRUpdater.installDebRemoteError`

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
  - event: `DRWebRTC.stats`

Documentation Generated: 2021-07-17 00:36:13

