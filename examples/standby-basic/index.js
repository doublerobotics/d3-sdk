// DRDoubleSDK is a global object loaded in by Electron in the Standby window and a "Trusted" Accessory window
if (!("DRDoubleSDK" in window)) {
	console.error("window.DRDoubleSDK not found. This is required.");
}

function q(selector) {
	return document.querySelector(selector);
}

DRDoubleSDK.on("event", (message) => {
	// Event messages include: { class: "DRNetwork", key: "info", data: {...} }
	switch (message.class + "." + message.key) {

		// DRNetwork
		case "DRNetwork.info": {
			q("#wifi_ssid").innerText = (message.data.connection == "connected" && message.data.ssid) ? message.data.ssid : "Unknown";
			q("#wifi_ip").innerText = message.data.internalIp;
			break;
		}

	}
});

function onConnect() {
	if (DRDoubleSDK.isConnected()) {
		DRDoubleSDK.resetWatchdog();

		// Subscribe to events that you will process. You can subscribe to more events at any time.
		DRDoubleSDK.sendCommand("events.subscribe", {
			events: [
				"DRBase.status",
				"DRNetwork.info",
			]
		});

		// Send commands any time – here, we're requesting initial info to show
		DRDoubleSDK.sendCommand("network.requestInfo");
		DRDoubleSDK.sendCommand("base.requestStatus");

		// Turn on the screen, but allow the screensaver to kick in later
		DRDoubleSDK.sendCommand("screensaver.nudge");

	} else {
		window.setTimeout(onConnect, 100);
	}
}

window.onload = () => {
	// REQUIRED: Tell d3-api that we're still running ok (faster than every 3000 ms) or the page will be reloaded.
	window.setInterval(() => {
		DRDoubleSDK.resetWatchdog();
	}, 2000);

	// DRDoubleSDK 
	onConnect();
	DRDoubleSDK.on("connect", () => {
		onConnect();
	});
};
