# Performance Model

The performance model of Double 3 is based on the Nvidia Jetson's nvpmodel and jetson_clocks. These limit the power usage of the hardware to maximize battery life or maximize performance. See their [Power Management for Jetson TX2 Series Devices][1] documentation for more details. 

Double 3 automatically manages this for all internal functions. The default is the `lowest` performance model, which maximizes battery life. This mode is also used during basic calls, including while running the obstacle avoidance sensors, cameras, etc. It will switch into a higher performance model when doing something CPU intensive, such as Multi-Viewer mode.

[In-Call Sidebar Apps][2] can set the minimum performanceModel required and the system will raise the performance to that level when your sidebar app is started.

If your custom standby screen or external code uses significant CPU or GPU, you may need to force a specific performance model. If you need to do this, you can set it as a startup parameter and the system will set it once on startup, then not do any automatic changing after that. You can set this with:

    api.setConfig
	{
	  "key": "PERFORMANCE_MODEL",
	  "value": "highest"
	}

Then send `system.reboot` or `system.restartService`.

To restore the default automatic management, set it to:

    api.setConfig
	{
	  "key": "PERFORMANCE_MODEL",
	  "value": "auto"
	}

## Models

- `lowest`
- `low`
- `high`
- `highest`

## Monitor Toolbar

The performance model selector in the Monitor's toolbar is ephemeral – it will change the next time the system needs a different performance model internall.

[1]: https://docs.nvidia.com/jetson/l4t/index.html#page/Tegra%20Linux%20Driver%20Package%20Development%20Guide/power_management_tx2_32.html#
[2]: Sidebar%20Apps.md
