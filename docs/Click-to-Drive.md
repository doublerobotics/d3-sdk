# Click-to-Drive and Docking

You can implement Click-to-Drive in your own driver client and server using built-in commands.

## Hit Test

This uses the "hit test" concept, meaning that you send mouse click coordinates to the camera process and it will fire an event describing what it hit – drivable floor, a Charging Dock icon, a QR code icon, or just dead space. Because this uses the current camera view, all pose offsets and pan–tilt–zoom are taken into account. The camera must be enabled for these commands to be processed (`camera.enable`) and navigate must be enabled for it to detect the floor and take action (`navigate.enable`).

    camera.hitTest
    {
		"x": 0.5,
		"y": 0.5,
		"highlight": true,
		"passToNavigate": true
	}

`x` and `y` are normalized coordinates on the video frame (percentage across the screen, with 0.5, 0.5 being the center). 0, 0 is the top left. 1, 1 is the bottom right.

`highlight` will flash a transparent circle over a dock icon or QR code icon, if it hits.

`passToNavigate` will automatically send the hit result to the navigate.hitResult command, meaning that it will take action to drive to the target, enter the dock, click the QR code icon, or do nothing at all, if nothing active is found on the hit test.

### Before Version 1.2.7

Prior to version 1.2.7, the `passToNavigate` parameter did not exist, so you would need to subscribe to the `DRCamera.hitResult` event, then send the data from that as the parameters of `navigate.hitResult`.

### Mouse Hover

There is not currently an easy way to implement the mouse hover effect found in our web driver client. It's technically possible to implement by parsing the `DRGridManager.robotGrid` and `DRPose.pose` events, but you'd need to implement a 3D scene in the driver client to calculate the real-time hover position of the mouse in robot world coordinates.

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

You can read the pose of the camera with the `DRPose.pose` event in the `wideCamera` property. The `wideCamera.quaternion` provides the current rotation and `wideCamera.viewport` provides the crop parameters based on the current zoom and digital pan, based on the wide camera view. The zoomed camera sensor is superimposed over the wide camera as the driver zooms in. Its position is aligned with the wide camera based on graphic matching at the moment of zooming in.
