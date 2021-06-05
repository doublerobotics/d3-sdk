# Display Camera Example

[See documentation for Standby Apps](../../docs/Standby%20Apps.md)

This example simply displays the output of the camera on the D3 screen using the standard `getUserMedia`.

1. **Enable the camera**. In the developer monitor, click the Dashboard > Camera > 1152x720 button.
1. **Output as a v4l2 source.** Click Dashboard > Camera > Output > v4l2
1. **Open the HTML file.** See the [standby-basic example](../standby-basic/) for how to host and open an HTML file on the D3 screen.

You can open this as a standby screen or in the accessory web view (basically, a second Electron window).

This requires D3 software version 1.0.22 or newer.
