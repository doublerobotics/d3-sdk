const DRDoubleSDK = require("./DRDoubleSDK.js");

var d3 = new DRDoubleSDK();

d3.on("connect", () => {
	d3.sendCommand("events.subscribe", {
		events: [
			"DRBase.status",
			"DRCamera.enable"
		]
	});
	d3.sendCommand("screensaver.nudge");
	d3.sendCommand("camera.enable", { "template": "screen" });
	d3.sendCommand("base.requestStatus");
});

d3.on("event", (message) => {
	switch (message.class +"."+ message.key) {
		case "DRBase.status":
			console.log(message.data);
			break;
		case "DRCamera.enable":
			console.log("camera enabled");
			break;
	}
});

// Shutdown
var alreadyCleanedUp = false;
function exitHandler(options, exitCode) {
	console.log("Exiting with code:", exitCode, "Cleanup:", options.cleanup);

	if (options.cleanup && !alreadyCleanedUp) {
		alreadyCleanedUp = true;
		d3.sendCommand("camera.disable");
	}
	
	if (options.exit) process.exit();
}
process.on('exit', exitHandler.bind(null, {cleanup:true}));
process.on('SIGINT', exitHandler.bind(null, {cleanup:true, exit:true})); // catches ctrl+c event
process.on('SIGTERM', exitHandler.bind(null, {cleanup:true, exit:true})); // catches SIGTERM event
process.on('uncaughtException', exitHandler.bind(null, {cleanup:true, exit:true})); // catches uncaught exceptions

d3.connect();
