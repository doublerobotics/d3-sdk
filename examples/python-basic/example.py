import double
import sys

d3 = double.DRDoubleSDK()

try:
    d3.sendCommand('events.subscribe', { 'events': [
        'DRBase.status',
        'DRCamera.enable'
    ]})
    d3.sendCommand('screensaver.nudge');
    d3.sendCommand('camera.enable', { 'template': 'screen' });
    d3.sendCommand('base.requestStatus');
    while True:
        packet = d3.recv()
        if packet != None:
            event = packet['class'] + '.' + packet['key']
            if event == 'DRBase.status':
                print(packet['data'])
            elif event == 'DRCamera.enable':
                print('camera enabled')

except KeyboardInterrupt:
    d3.sendCommand('camera.disable');
    d3.sendCommand('screensaver.nudge');
    d3.close()
    print('cleaned up')
    sys.exit(0)
