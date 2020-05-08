import threading
import socket
import json

class DRDoubleSDK():
    def __init__(self, address='/tmp/doubleapi'):
        self.sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
        self.sock.connect(address)

    def close(self):
        self.sock.close()

    def sendCommand(self, command, data=None):
        packet = { 'c': command }
        if data is not None: packet['d'] = data
        jsonString = json.dumps(packet)
        self.sock.send(jsonString.encode('utf-8'))

    def recv(self):
        packet = self.sock.recv(4096).decode('utf-8')
        if not packet:
            exit('Error: received None from D3SDK')
        object = None
        try:
            object = json.loads(packet)
        except ValueError as e:
            print("JSON Parse error", packet)
        return object
