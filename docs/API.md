# D3 API
API Version: 1.0.26
## Commands
[api](#api), [base](#base), [calibration](#calibration), [camera](#camera), [depth](#depth), [dockTracker](#dockTracker), [documentation](#documentation), [endpoint](#endpoint), [events](#events), [gridManager](#gridManager), [gui](#gui), [imu](#imu), [mics](#mics), [navigate](#navigate), [network](#network), [pose](#pose), [ptz](#ptz), [speaker](#speaker), [screensaver](#screensaver), [system](#system), [tilt](#tilt), [ultrasonic](#ultrasonic), [updater](#updater), [webrtc](#webrtc)
### api
- api.requestStatus
- api.requestLocalConfiguration
- api.requestRemoteConfiguration
- api.setConfig
  - parameters: ```{key:'STANDBY_URL',value:'https://standby.doublerobotics.com'}```
  - Restart service is required (system.restartService). To delete key, send value null or don't include value at all.

### base
- base.requestVersion
- base.requestStatus
- base.pole.stand
- base.pole.sit
- base.pole.stop
- base.pole.setTarget
  - paremeters: {percent:1.0}
- base.kickstand.retract
- base.kickstand.deploy
- base.travel.start
- base.travel.stop
- base.turnBy
  - parameters: ```{degrees:0,degreesWhileDriving:0}```
- base.qc.requestConstants
- base.qc.resetAllConstants
- base.qc.setConstant
- base.qc.calibrateAngle
- base.qc.startBatteryLogging
- base.qc.stopBatteryLogging
- base.requestShutdown

### calibration
- calibration.requestValues
- calibration.resetAll
- calibration.setValueForKey
- calibration.set.cameraTiltBacklash
  - parameters: ```{value:1000}```
- calibration.set.cameraTiltMaxTravel
  - parameters: ```{value:75000}```
- calibration.set.cameraTiltHomingStallThreshold
  - parameters: ```{value:34}```
- calibration.set.cameraTiltMin
  - parameters: ```{degrees:-23}```
- calibration.set.cameraTiltMax
  - parameters: ```{degrees:30}```
- calibration.set.imuRoll
  - parameters: ```{degrees:0}```
- calibration.set.frontDepthRoll
  - parameters: ```{degrees:0}```
- calibration.set.frontDepthPitch
  - parameters: ```{degrees:0}```
- calibration.set.floorDepthRoll
  - parameters: ```{degrees:0}```
- calibration.set.floorDepthPitch
  - parameters: ```{degrees:0}```
- calibration.set.serial
  - parameters: ```{value:'15-'}```
- calibration.set.ultrasonicShortThresholds
  - parameters: ```{value:'100,0;400,184;200,200;200,200;100,176;100,136;100,80;200,32;400,8;5000,8;5000,8;5000,8'}```
- calibration.set.ultrasonicLongThresholds
  - parameters: ```{value:'1400,160;1000,32;1000,16;2400,16;2400,16;1400,16;1400,16;1400,16;1400,16;1400,24;1400,24;1400,24'}```

### camera
- camera.enable
  - parameters: ```{width:1152,height:720,template:'h264ForWebRTC',gstreamer:'appsrc name=d3src ! autovideosink'}```
  - Pass either `template` or `gstreamer`. If both are passed, `template` will take precedence.
  - If the camera is already enabled, the size will not be changed, but the new output(`template` or`gstreamer`) will be applied.
- camera.disable
- camera.zoom
  - parameters: ```{sensor:0,zoom:1,x:0,y:0,updateRegion:true,time:0.5}```
  - Sensor 0 (wide) or 1 (narrow), zoom is 1.0 - 4.0, x and y are -1.0 = 1.0, updateRegion crops exposure and white balance, animationLength is in seconds
  - Note: We recommend using ptz.* commands instead of camera.zoom directly.
- camera.setInterpolation
- camera.night.enable
- camera.night.disable
- camera.output
  - parameters: ```{template:'h264ForWebRTC',gstreamer:'appsrc name=d3src ! autovideosink',width:1152,height:720}```
  - Send only one of either `template` or `gstreamer`. Possible values for template:
    - `preheat` turns the camera on, but no output
    - `screen` shows on-screen using "nvoverlaysink"
    - `h264ForWebRTC` hardware encoding to h264 and publishes to the d3-webrtc binary
    - `v4l2` outputs to /dev/video9 and shows up as a webcam "D3_Camera" in Electron/Chromium
- camera.setMaxFps
  - parameters: ```{fps:30}```
- camera.graphics.enable
- camera.graphics.disable
- camera.graphics.occlusion.enable
- camera.graphics.occlusion.disable
- camera.graphics.configure
- camera.graphics.setLevel
- camera.graphics.dots.setColor
  - parameters: ```{r:1,g:1,b:1,a:1}```
- camera.graphics.dots.setColorIsAutomatic
- camera.move.speed
  - parameters: ```{x:0,y:0,zoom:0}```
- camera.move.stop
- camera.pose.setRequired
- camera.pose.setNotRequired
- camera.grid.enable
- camera.grid.disable
- camera.encoder.forceInterFrame
- camera.encoder.setRates
  - parameters: ```{bitrate:4000000,fps:30}```
- camera.capturePhoto
- camera.hitTest
  - parameters: ```{x:0.5,y:0.5,highlight:true}```
- camera.v4l2loopback.install
- camera.v4l2loopback.remove
- camera.qc.line.enable
  - parameters: ```{x:2,z:1}```
- camera.qc.line.disable

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
  - parameters: ```{columns:true,grid:false}```
- depth.front.detectors
  - parameters: ```{frontGrid:true}```
- depth.floor.hdr.enable
- depth.floor.hdr.disable
- depth.floor.setROI
  - parameters: ```{left:0,right:847,top:0,bottom:479}```
- depth.front.setROI
  - parameters: ```{left:0,right:847,top:0,bottom:479}```

### dockTracker
- dockTracker.enable
- dockTracker.disable
- dockTracker.clear

### documentation
- documentation.requestCommands
  - parameters: ```{header:false,links:true,tableOfContents:true}```
- documentation.requestEvents
- documentation.requestForGitHub

### endpoint
- endpoint.enable
- endpoint.disable
- endpoint.requestModuleStatus
- endpoint.requestStatusForDriver
- endpoint.requestIdentity
  - parameters: ```{requestSetupLink:false}```
- endpoint.requestLinkedIdentity
  - This will not return anything, if the identity is not linked. It is used for checking the server during setup, so we'll know when the owner has linked the robot to their account on the server.
- endpoint.unlinkIdentity
- endpoint.requestVisitorPassCreatorLink
- endpoint.session.end
- endpoint.setOptions
  - parameters: ```{allowDisablingObstacleAvoidance:false,disablePhoto:false,defaultToObstacleAvoidanceStop:false}```
  - All parameters are optional.
- endpoint.requestOptions
- endpoint.driverSidebar.sendMessage
  - parameters: ```{message:{},targetOrigin:'example.com'}```
  - This command is in development, not stable, and could disappear.
  - For targetOrigin definition, see: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage

### events
- events.subscribe
  - parameters: ```{events:['DRBase.status']}```
- events.unsubscribe
  - parameters: ```{events:['DRBase.status']}```
- events.monitor.pause
- events.monitor.resume
- events.ipc.pause
- events.ipc.resume
- events.server.enable
- events.server.pause
- events.server.resume
- events.server.renew
- events.console.pause
- events.console.resume

### gridManager
- gridManager.enable
- gridManager.disable
- gridManager.clear
- gridManager.wipe
  - parameters: ```{thickness:0.1,increment:0.05,ms:20}```

### gui
- gui.enable
  - parameters: ```{standbyUrl:'https://standby.doublerobotics.com',debug:false}```
- gui.disable
- gui.go.wifi
- gui.go.standby
  - parameters: ```{url:'https://standby.doublerobotics.com'}```
- gui.message.to
- gui.message.from
- gui.hide
- gui.show
- gui.watchdog.allow
- gui.watchdog.disallow
- gui.watchdog.reset
- gui.accessoryWebView.open
  - parameters: ```{url:'https://www.doublerobotics.com',trusted:false,transparent:false,backgroundColor:'#FFF'}```
  - Trusted means that Electron will load the window.DRDoubleSDK object, which is a channel to communicate with d3-api. This will give that web page access to all of the d3-api commands, so you should trust only your own URLs.
- gui.accessoryWebView.open.screenSharingReceive
- gui.accessoryWebView.open.qc
- gui.accessoryWebView.open.incall
- gui.accessoryWebView.close
- gui.accessoryWebView.hide
- gui.accessoryWebView.show
- gui.accessoryWebView.message.to
- gui.accessoryWebView.message.from

### imu
- imu.enable
- imu.disable
- imu.resume
- imu.pause
- imu.log.pause
- imu.log.resume
- imu.qc.calibrate
- imu.stdout.pause
- imu.stdout.resume

### mics
- mics.setBoost
  - parameters: ```{percent:0.25}```
- mics.requestStatus

### navigate
- navigate.enable
- navigate.disable
- navigate.obstacleAvoidance.setLevel
  - parameters: ```{level:2}```
  - 0 = Off, 1 = Slow and stop for obstacles, 2 = Divert around obstacles
- navigate.drive
  - parameters: ```{throttle:0,turn:0,powerDrive:false}```
  - Throttle and turn are -1.0 - 1.0. Actual driving speed will be filtered by the obstacle avoidance module.
  - To maintain smooth driving, this command must be sent repeatedly (every 200ms is recommended) or it will default to stopping after the timeout (500ms).
- navigate.target
  - parameters: ```{x:0,y:0,angleRadians:0,relative:true,dock:false,dockId:0}```
  - x/y units are in meters, x = forward/back, y = left/right
  - To dock, use dock: forward (backward is not supported) and pass dockId:XXXXXX
  - angleRadians is the angle to end at, after reaching the target
- navigate.cancelTarget
- navigate.hitResult
  - parameters: {hit:true,x:0.0,y:0.0,z:0.0,...}
  - Pass the data from the DRCamera.hitResult event after sending camera.hitTest to this command to automatically drive to the found position. If hit:false, no action will be taken.

### network
- network.requestScan
  - parameters: ```{rssi:false}```
- network.requestActiveAP
- network.join
  - parameters: ```{ssid:'',password:'',wifiSecKeyMgmt:'',ipv4method:'',eap:'',phase2auth:'',identity:'',anonymousIdentity:''}```
  - wifiSecKeyMgmt: optional. [none|ieee8021x|wpa-none|wpa-psk|wpa-eap] defaults to wpa-eap if other optional params are set, but this one is not set.
  - ipv4method: optional.  [auto|link-local|manual|shared|disabled]
  - eap: optional.  [leap|md5|tls|peap|ttls|sim|fast|pwd]
  - phase2auth: optional.  [pap|chap|mschap|mschapv2|gtc|otp|md5|tls]
  - identity: optional.  (WPA2 Ent. username)
  - anonymousIdentity: optional.  (802-1x.anonymous-identity)
- network.join.cancel
- network.reset
- network.requestInfo
- network.requestLocation
- network.connections.request
- network.connections.delete

### pose
- pose.requestModel
- pose.resetOrigin
- pose.tilt.setDelay
  - parameters: ```{ms:0}```
- pose.setSlerpRate
  - parameters: ```{rate:1}```
  - IMU smoothing, 0-1

### ptz
- ptz.requestStatus
- ptz.move
  - parameters: ```{x:0,y:0,zoom:0}```
  - x and y are both -1.0 to 1.0, as percentages of the maximum speed.
  - This must be sent repeatedly (faster than every 200 ms) to continue moving.
- ptz.stop
- ptz.in
  - parameters: ```{by:1,speed:0.5,x:0,y:0}```
  - x and y are both -1.0 to 1.0, as percentages of the current viewport, with the center being 0,0.
- ptz.out
  - parameters: ```{by:1,time:0.5}```
- ptz.reset

### speaker
- speaker.enable
- speaker.disable
- speaker.setVolume
  - parameters: ```{percent:1}```
- speaker.requestVolume

### screensaver
- screensaver.requestStatus
- screensaver.nudge
- screensaver.allow
  - parameters: ```{seconds:120}```
- screensaver.prevent
- screensaver.show
- screensaver.hide

### system
- system.requestScreenshot
- system.requestInfo
- system.requestDiskSpace
- system.tegrastats.enable
- system.tegrastats.disable
- system.terminal.enable
- system.terminal.disable
- system.terminal.resize
  - parameters: ```{cols:140,rows:80}```
- system.terminal
  - parameters: ```{stdin:'ls'}```
- system.touchscreen.startCalibration
- system.touchscreen.stopCalibration
- system.screen.setBrightness
  - parameters: ```{percent:0.7,fadeMs:500}```
- system.clocks.setLow
- system.clocks.setHigh
- system.clocks.request
- system.restartService
  - parameters: ```{stealth:false}```
- system.reboot
- system.shutdown
- system.enableRearUSBPorts
- system.disableRearUSBPorts
- system.enableUSBHub
- system.disableUSBHub
- system.finalizeAndReboot

### tilt
- tilt.enable
- tilt.disable
- tilt.target
  - parameters: ```{percent:1}```
  - Percent range is 0.0 - 1.0, with 0.0 being tilted up and 1.0 tilted down.
- tilt.move
  - parameters: ```{speed:0}```
  - Speed is -1.0 (tilt up full speed) to 1.0 (tilt down full speed), with 0.0 being stop.
  - To maintain smooth motion, this command must be sent repeatedly (every 200ms is recommended) or it will default to stopping after the timeout (500ms).
- tilt.stop
- tilt.home
- tilt.default
- tilt.requestPosition
- tilt.commandDelayMs
  - parameters: ```{ms:100}```
- tilt.qc.jiggleUp
- tilt.qc.jiggleDown
- tilt.qc.testBacklash
  - parameters: ```{ticks:1000}```

### ultrasonic
- ultrasonic.enable
- ultrasonic.disable
- ultrasonic.start
  - parameters: ```{pattern:[2,0,4,2,1,3],delay:10,dump:false}```
- ultrasonic.stop
- ultrasonic.resetShortRangeCalibration
- ultrasonic.resetLongRangeCalibration

### updater
- updater.base.update
- updater.base.updateDev
- updater.base.installHex
- updater.requestStatus
- updater.realSenseServer.enable
- updater.realSenseServer.disable
- updater.realSense.list
- updater.realSense.updateAll
- updater.deb.install
  - parameters: ```{path:''}```
- updater.deb.installRemote
  - parameters: ```{url:''}```

### webrtc
- webrtc.enable
  - parameters: ```{servers:[{urls:'stun:rtc.doublerobotics.com'}],transportPolicy:'all',manageCamera:false}```
  - The servers parameter is optional. It will default to Double's servers.
- webrtc.disable
- webrtc.signal
- webrtc.setMicrophoneVolume
  - parameters: ```{percent:1}```

Documentation Generated: 2020-06-02 04:02:12


----


### DRAPI
- localConfiguration
- remoteConfiguration
- setStartupConfig
- setStartupConfigError
- status

### DRDebugServer
- connection
- debugHeartbeat
- error
- listen

### DRDepthClient
- binary

### DRDocumentation
- commands
- events
- forGitHub

### DRIPCServer
- clientConnected
- clientDisconnected
- clientError
- errorAddressInUse
- parseError
- restartedServer
- serverBail
- serverStarted

### DRLogger
- debugHeartbeat

### DRBase
- badChecksum
- batteryStats
- bootloaderDidLaunch
- bootloaderSendNextData
- burnHexEerror
- burnHexFirmware
- constants
- debugString
- hexDataFromString
- kBettyCommandBootloaderConfirmEnd
- kBettyCommandBootloaderError
- packetSendError
- sendCommand
- serialError
- shutdownRequest
- startSendingBootloaderPing
- status
- travel
- travelRate
- unhandledCommand
- version

### DRCamera
- event
- restartingArgus

### DRDepth
- deviceError
- deviceNotFound
- err

### DRIMU
- calibrationBegan
- calibrationDone
- calibrationLog
- converge
- imu
- repeatWatchdog
- stdoutError

### DRMics
- setBoostError
- status

### DRMotor
- open

### DRMotorParent
- result.event
- willStart

### DRSpeaker
- getError
- setError
- volume

### DRUltrasonic
- dump
- invalidChecksum
- longRangeThresholds
- measurement
- sendConfig
- serialError
- shortRangeThresholds
- unknownData
- watchdog

### DRConnection
- connect
- connect_error
- connect_timeout
- disconnect
- error
- identityChangeHandler
- receivedCommand
- reconnect
- reconnect_attempt
- reconnect_error
- reconnect_failed
- reconnecting
- sendCommand

### DREndpointModule
- debug: DRCommands.DriverToRobotHello
- debug: beginning session
- debug: ending session
- driverDidReceiveVideo
- error
- identityHotUpdate
- inboundCommand
- messageFromDriverSidebar
- options
- outboundCommand
- photoError
- screenSharingLog
- sessionBegin
- sessionEnd
- setup
- status
- statusForDriver
- visitorPassCreatorLink

### DRIdentity
- errorGettingIdentity
- errorSettingLocation
- errorSettingNickname

### DRWebRTC
- event
- stats

### index
- boot
- version

### DRDockTracker
- clear
- disable
- docks
- enable

### DRGridManager
- robotGrid

### DRNavigateModule
- arrive
- cancelTarget
- newTarget
- restartingTravelData
- target
- targetState

### DRObstacleAvoidance
- cancelDiversion
- level
- modifyDriveControls

### DRPTZModule
- status

### DRPose
- model
- pose
- resetOrigin

### DRNetwork
- bandwidth
- connect
- connecting
- connections
- disconnect
- hop
- info
- join
- joinError
- joinRetry
- location
- monitorLog
- networkError
- rejoin
- reset
- resetAfterBoot
- resetError
- scan
- scanActiveAP
- signal

### DRNetworkChecker
- errorButNeverConnected
- outOfOrderResponse
- request
- result

### DRNetworkLocation
- gettingLocation
- retry

### DRNetworkScanner
- iwScanError
- nmcliScanError

### DRDevice
- enable

### DRModule
- disable
- enable

### DRSpawnable
- error
- event
- exit
- respawn
- state
- stderr
- stdinError
- watchdog

### DRGUI
- accessoryWebView.close
- accessoryWebView.hide
- accessoryWebView.message.from
- accessoryWebView.message.to
- accessoryWebView.open
- accessoryWebView.show
- event
- go.standby
- go.wifi
- hide
- message.from
- message.to
- show
- standbyWatchdog

### DRScreensaver
- allow
- hide
- prevent
- show
- status

### DRCalibration
- values

### DRRealSenseServer
- stdout

### DRSystem
- brightness
- brightnessFadeComplete
- checkDiskSpace
- checkDiskSpaceError
- clocks
- clocksError
- finalizeError
- nvpmodelError
- reboot
- restartService
- screenshot
- shutdown
- systemInfo
- tegrastats
- tegrastatsEnded
- tegrastatsError
- terminal
- touchscreenCalibrationExit

### DRUpdater
- downloaded
- installDebBegin
- installDebRemoteDownload
- installDebRemoteError
- installFirmwareError
- realSenseDevices
- realSenseUpdateComplete
- realSenseUpdateProgress
- realSenseUpdateStart

