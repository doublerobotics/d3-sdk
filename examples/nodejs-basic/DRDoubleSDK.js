const net = require("net");
const EventEmitter = require("events");

class DRDoubleSDK extends EventEmitter {

	constructor() {
		super();
		this.path = '/tmp/doubleapi';
		this.client = null;
		this.clientConnected = false;
	}

	isConnected() {
		return this.clientConnected;
	}

	connect() {
		if (this.clientConnected) {
			return;
		}
		this.client = net.createConnection(this.path);
		this.client.on("connect", () => {
			this.clientConnected = true;
			this.emit("connect");
		});
		this.client.on('data', (data) => {
			this.processBuffer(data.toString());
		});
		this.client.on('close', () => {
			this.clientConnected = false;
			this.emit("disconnect");
			setTimeout( () => {
				console.log("Attempting reconnect");
				this.connect();
			}, 1000);
		});
		this.client.on('error', (err) => {
			console.log("error", err);
			this.emit("error", err);
		});
	}

	processBuffer(str) {
		var packets = null;
		var lines = str.split("\n");
		for (var i = 0; i < lines.length; i++) {
			try {
				packets = [JSON.parse(line[i])];
			} catch (err) {
				// maybe it's multiple packets?
				try {
					str = "["+ str.replace(/\n/g, "").replace(/}{/g, "},{") +"]";
					packets = JSON.parse(str);
				} catch (err) {
					// bail out
					console.log("JSON.parse error: ", err, str);
					return;
				}
			}
			if (packets) {
				this.processMessage(packets);
			}
		}
	}

	processMessage(packets) {
		var arr = null;
		if (Array.isArray(packets)) {
			arr = packets;
		} else {
			arr = [packets];
		}
		for (var i = 0; i < arr.length; i++) {
			this.emit("event", arr[i]);
		}
	}

	sendCommand(c, d) {
		var packet = {
			c: c
		};
		if (d) {
			packet.d = d;
		}
		this.client.write(JSON.stringify(packet) +"\n");
	}

	resetWatchdog() {
		this.sendCommand("gui.watchdog.reset");
	}

}

module.exports = DRDoubleSDK;