# Click-to-Drive

You can implement Click-to-Drive in your own driver client and server using built-in commands.

## Hit Test

This uses the "hit test" concept, meaning that you send a mouse click to the camera process and it will fire an event describing what it hit – drivable floor, a Charging Dock icon, a QR code icon, or just dead space. Because this uses the current camera view, all pose offsets and pan–tilt–zoom are taken into account. The camera must be enabled for these commands to be processed (`camera.enable`).

Call `navigate.enable` and give it a second or two to start the sensors.

### Before version 1.3.2

    camera.hitTest
    { "x": 0.5, "y": 0.5, "highlight": true }

These are normalized coordinates on the video frame (percentage across the screen, with 0.5, 0.5 being the center).

Subscribe to the event:

    DRCamera.hitResult
	
Pass the data from that event as the parameters to:

    navigate.hitResult

### Starting with version 1.3.2

    camera.hitTest
    { "x": 0.5, "y": 0.5, "highlight": true, "passToNavigate": true }

That's it!

If you have previously called navigate.enable, this will trigger the relevant navigation action. If there was nothing found with the hit, then the command will be ignored.

Note that there is not currently an easy way to implement the mouse hover effect found in our web driver client. It's technically possible to implement by parsing the `DRGridManager.robotGrid` and `DRPose.pose` events, but you'd need to implement a 3D scene in the driver client to calculate the real-time hover position of the mouse in robot world coordinates.

## Pan–Tilt–Zoom

You can build pan–tilt–zoom controls using built-in functions, as well. These offsets will be taken into account for the hit test described above.

- ptz.in
  - parameters: { "by": 1, "time": 0.5, "x": 0, "y": 0 }
  - `by` is a positive integer stepping through preset zoom levels: 1, 1.33, 2, 2.95 (narrow camera starts to show), 6, 12
  - `time` is seconds
  - `x` and `y` are both -1.0 to 1.0, as percentages of the current viewport, with the center being 0, 0.
- ptz.move
  - parameters: { "x": 0, "y": 0, "zoom": 0 }
  - `x` and `y` are both -1.0 to 1.0, as percentages of the maximum speed.
  - This must be sent repeatedly (faster than every 200 ms) to continue moving.
- ptz.out
  - parameters: { "by": 1, "time": 0.5 }
  - `by` is a positive integer stepping through preset zoom levels: 1, 1.33, 2, 2.95 (narrow camera starts to show), 6, 12
  - `speed` is seconds
- ptz.reset
- ptz.stop

### Camera Pose

You can read the pose of the camera with the `DRPose.pose` event in the `wideCamera` property. The `wideCamera.quaternion` provides the current rotation and `wideCamera.viewport` provides the crop parameters based on the current zoom and digital pan.
