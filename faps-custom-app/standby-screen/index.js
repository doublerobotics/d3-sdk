// DRDoubleSDK is a global object loaded in by Electron in the Standby window and a "Trusted" Accessory window
if (!("DRDoubleSDK" in window)) {
	console.error("window.DRDoubleSDK not found. This is required.");
}

function q(selector) {
	return document.querySelector(selector);
}

function showGUI() {
	DRDoubleSDK.sendCommand('gui.accessoryWebView.show');
}

const jsonSpec = {
	  "url": "https://192.168.188.178/accessory-page",
	  "trusted": true,
	  "transparent": true,
	  "backgroundColor": "#FFF",
	  "hidden": false
  }
const endpointSettings = {
		"allowDisablingObstacleAvoidance": false,
		"disablePhoto": true,
		"hideVisitorPassButton": true,
		"defaultSpeakerVolume": 0.45,
		"disableApp_multiviewer": true,
		"disableApp_screensharing": true,
		"disableApp_webpage": true,
		"disableApp_text": true,
		"disableApp_satellite": true
}
var guiInterval;

DRDoubleSDK.on("event", (message) => {
	// Event messages include: { class: "DRNetwork", key: "info", data: {...} }
	switch (message.class + "." + message.key) {

		// DRNetwork
		case "DRNetwork.info": {
			q("#wifi_ssid").innerText = (message.data.connection == "connected" && message.data.ssid) ? message.data.ssid : "Unknown";
			q("#wifi_ip").innerText = message.data.internalIp;
			break;
		}
		// DRBase
		case "DRBase.status": {
			q("#battery_value").innerText = message.data.battery + ' %';
			if (message.data.charging) {
				q("#chargingDiv").style.backgroundColor = "red";
				q("#chargingDiv").innerHTML = "Ladevorgang aktiv";
			} else {
				q("#chargingDiv").style.backgroundColor = "inherit";
				q("#chargingDiv").innerHTML = "kein Ladevorgang";
			}
			break;
		}
		// DREndpoint
		case "DREndpointModule.status": {
			q("#title").innerHTML = message.data.identity.robot.nickname;
			break;
		}
		case "DREndpointModule.sessionBegin": {
			DRDoubleSDK.sendCommand("gui.accessoryWebView.open", jsonSpec);
			guiInterval = window.setInterval(showGUI, 2000);
			break;
		}
		case "DREndpointModule.sessionEnd": {
			DRDoubleSDK.sendCommand("gui.accessoryWebView.close");
			clearInterval(guiInterval);
			DRDoubleSDK.sendCommand("mics.setBoost", { percent: 0.0 });
			DRDoubleSDK.sendCommand("base.kickstand.deploy");
			break;
		}
		// DRMics
		case "DRMics.status": {
			q("#mic_value").innerText = message.data.boost == 0.0 ? 'AUS' : 'AN';
			break;
		}
		// DRAPI
		case "DRAPI.status": {
			q("#cam_value").innerHTML = message.data.camera ? 'AN' : 'AUS';
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
				"DREndpointModule.status",
				"DREndpointModule.sessionBegin",
				"DREndpointModule.sessionEnd",
				"DRMics.status",
                "DRAPI.status",
			]
		});

		// Send commands any time – here, we're requesting initial info to show
		DRDoubleSDK.sendCommand("endpoint.setOptions", endpointSettings);
		DRDoubleSDK.sendCommand("mics.setBoost", { percent: 0.0 });
		DRDoubleSDK.sendCommand("network.requestInfo");
		DRDoubleSDK.sendCommand("base.requestStatus");
		DRDoubleSDK.sendCommand("endpoint.requestIdentity", { requestSetupLink: false });
		DRDoubleSDK.sendCommand("mics.requestStatus");
		DRDoubleSDK.sendCommand("api.requestStatus");

		// Turn on the screen, but allow the screensaver to kick in later
		DRDoubleSDK.sendCommand("screensaver.nudge");

	// debug
	q("#chargingDiv").style.backgroundColor = "blue";

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
