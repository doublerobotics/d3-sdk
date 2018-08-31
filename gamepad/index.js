var HID = require('node-hid');
var dualShock = require('dualshock-controller');

console.log('devices:', HID.devices());

var controller = dualShock({
	config: "dualShock4-alternate-driver",
	accelerometerSmoothing: true,
	analogStickSmoothing: true
});
controller.on('error', err => console.log(err));

// Events
controller.on('connected', () => console.log('connected'));
controller.on('connection:change', data => console.log(data));

controller.on('left:move', data => console.log('left Moved: ' + data.x + ' | ' + data.y));
controller.on('right:move', data => console.log('right Moved: ' + data.x + ' | ' + data.y));

controller.on('square:press', ()=> console.log('square press'));
controller.on('square:release', () => console.log('square release'));

controller.on('triangle:press', ()=> console.log('triangle press'));
controller.on('triangle:release', () => console.log('triangle release'));

controller.on('circle:press', ()=> console.log('circle press'));
controller.on('circle:release', () => console.log('circle release'));

controller.on('x:press', ()=> console.log('x press'));
controller.on('x:release', () => console.log('x release'));

controller.on("dpadUp:press", () => console.log("dpadUp:press") );
controller.on("dpadUpRight:press", () => console.log("dpadUpRight:press") );
controller.on("dpadRight:press", () => console.log("dpadRight:press") );
controller.on("dpadDownRight:press", () => console.log("dpadDownRight:press") );
controller.on("dpadDown:press", () => console.log("dpadDown:press") );
controller.on("dpadDownLeft:press", () => console.log("dpadDownLeft:press") );
controller.on("dpadLeft:press", () => console.log("dpadLeft:press") );
controller.on("dpadUpLeft:press", () => console.log("dpadUpLeft:press") );
controller.on('l1:press', () => console.log('l1:press') );
controller.on('l2:press', () => console.log('l2:press') );
controller.on('r1:press', () => console.log('r1:press') );
controller.on('r2:press', () => console.log('r2:press') );

controller.on("dpadUp:release", () => console.log("dpadUp:release") );
controller.on("dpadUpRight:release", () => console.log("dpadUpRight:release") );
controller.on("dpadRight:release", () => console.log("dpadRight:release") );
controller.on("dpadDownRight:release", () => console.log("dpadDownRight:release") );
controller.on("dpadDown:release", () => console.log("dpadDown:release") );
controller.on("dpadDownLeft:release", () => console.log("dpadDownLeft:release") );
controller.on("dpadLeft:release", () => console.log("dpadLeft:release") );
controller.on("dpadUpLeft:release", () => console.log("dpadUpLeft:release") );
controller.on('l1:release', () => console.log('l1:release') );
controller.on('l2:release', () => console.log('l2:release') );
controller.on('r1:release', () => console.log('r1:release') );
controller.on('r2:release', () => console.log('r2:release') );
