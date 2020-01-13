if (!("DRDoubleSDK" in window)) {
	console.error("window.DRDoubleSDK not found. This is required.");
}

DRDoubleSDK.on("event", (message) => {
	switch (message.class +"."+ message.key) {

		// DREndpointModule
		case "DREndpointModule.status": {
			console.log(message.data);
			break;
		}

		// DRNetwork
		case "DRNetwork.info": {
			q("#wifi_ssid").innerText = (message.data.connection == "connected" && message.data.ssid) ? message.data.ssid : "Unknown";
			q("#wifi_ip").innerText = message.data.internalIp;
			break;
		}

	}
});

window.onConnect = () => {
	if (DRDoubleSDK.isConnected()) {
		DRDoubleSDK.resetWatchdog();
		DRDoubleSDK.sendCommand("events.subscribe", {
			events: [
				"DRBase.status",
				"DRNetwork.info",
			]
		});
		DRDoubleSDK.sendCommand("network.requestInfo");
		DRDoubleSDK.sendCommand("base.requestStatus");
		DRDoubleSDK.sendCommand("screensaver.nudge");
	} else {
		window.setTimeout(window.onConnect, 100);
	}
}

window.onload = () => {
	// REQUIRED: Tell d3-api that we're still running ok (faster than every 3000 ms)
	window.setInterval(() => {
		DRDoubleSDK.resetWatchdog();
	}, 2000);

	onConnect();
	DRDoubleSDK.on("connect", () => {
		onConnect();
	});
};


// Utilities

function q(selector) {
	return document.querySelector(selector);
}
