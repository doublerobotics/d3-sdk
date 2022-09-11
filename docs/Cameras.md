# Accessing Cameras

Double 3 has two main cameras – one with an ultrawide angle lens and one with a narrower lens. You can access each sensor's raw stream or use the processed stream that you see during normal Double calls.

## Raw Camera Feeds

When accessing the raw camera feeds from your code, the Double software cannot access them. These libraries are from Nvidia and not managed by Double.

### Nvidia's gstreamer source element `nvarguscamerasrc`

[See Nvidia's documentation](https://docs.nvidia.com/jetson/archives/r34.1/DeveloperGuide/text/SD/CameraDevelopment/CameraSoftwareDevelopmentSolution.html)

	gst-launch-1.0 nvarguscamerasrc sensor-id=1 ! nvoverlaysink

Sensor 1 has the ultrawide lens and sensor 0 has the narrow lens.

### Nvidia's Libargus C++ Library

The two sensors are hooked up as CSI cameras, so they work with Nvidia's native Libargus C++ library.

[See Nvidia's Libargus Camera API documentation](https://docs.nvidia.com/jetson/l4t-multimedia/group__LibargusAPI.html)

## Processed Camera Feeds

During a normal call, the internal software will process both cameras on the GPU to remove barrel distortion, improve colors, perform digital zoom and pan, automatically switch and align cameras while zooming, and add mixed reality graphics. You can command the D3 software to output this processed video stream at any time for use in your custom code, even during a standard Double call.

[See the D3 API camera documentation](API.md#camera)

### V4L2

You can output the processed camera feed to [Linux's standard V4L2 protocol](https://en.wikipedia.org/wiki/Video4Linux).

Send D3 API the command `camera.enable` or, if already running, `camera.output` with parameters:

	{ "template": "v4l2" }

This will make it available at the `/dev/video9` V4L2 device file. Many libraries exist to access V4L2 cameras from your custom code running on Linux.

### getUserMedia in JavaScript

When outputting to V4L2, the stream becomes available as a virtual webcam in JavaScript with the name `D3_Camera`. You can access it in your [Standby App](Standby%20Apps.md) or [Sidebar App](Sidebar%20Apps.md) with the standard [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) JavaScript feature.

[See the Standby Camera example](../standby-camera/)

### OpenCV

If you choose to install OpenCV and want to consume the processed camera stream, you'll need to output via v4l2. If you use either the native video sizes of 720 height or 1080 height, the output format is I420, which you can set in OpenCV with:

	cap.set(cv2.CAP_PROP_FOURCC, cv2.VideoWriter_fourcc('I', '4', '2', '0'))

If you set the video output to a different size or aspect ratio, the interal processing will scale and crop the output and it will be in the YUY2 format. OpenCV can read this format by default, without the above setting.

### Native WebRTC

The `h264ForWebRTC` output is used in conjuction with our native WebRTC binary.

[See the Standby WebRTC example](../standby-webrtc/)

## Multiple Outputs and During a Call

Only one process at a time can access the camera hardware, but the D3 camera processing software can output to multiple streams. This means that you can output to V4L2 while a call is running. To do this, after a call begins, you would send the command `camera.output` with parameters (note the array):

	{ "template": [ "h264ForWebRTC", "v4l2" ] }

## RealSense Infrared Cameras

The two RealSense sensors (floor and front) each have built-in infrared cameras, which you can access through [librealsense](https://github.com/IntelRealSense/librealsense), but the sensors can only be access by one process at a time, so you cannot use them during a call without disabling one or both after a call starts.

Note that you must not change the version of librealsense installed on your robot. It is a shared library used by multiple processes and updates will break the built-in software.

## Third-Party USB Cameras

While not fully tested or supported, you should be able to plug in third-party USB cameras. Ubuntu will likely detect them and make them available via V4L2 and `getUserMedia`. You'll need to ensure that the USB ports have been enabled.
