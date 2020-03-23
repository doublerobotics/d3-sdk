// WebRTC

export function DriverWebRTC(iceConfig, log, sendToServer, hangUpCall) {

  var pc = null;
  var localVideo = document.getElementById("localVideo");
  var remoteVideo = document.getElementById("remoteVideo");
  
  this.handleVideoOffer = async (msg) => {
    log("Received call offer");

    if (!localVideo.srcObject) {
      localVideo.srcObject = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    }

    pc = new RTCPeerConnection(iceConfig);
    pc.onicecandidate = (event) => this.onicecandidate(event);
    pc.oniceconnectionstatechange = () => this.oniceconnectionstatechange();
    pc.onicegatheringstatechange = () => this.onicegatheringstatechange();
    pc.onsignalingstatechange = () => this.onsignalingstatechange();
    pc.ontrack = (event) => this.ontrack(event);
    
    localVideo.srcObject.getTracks().forEach(track => pc.addTrack(track, localVideo.srcObject));

    var desc = new RTCSessionDescription(msg);
    await pc.setRemoteDescription(desc);
    await pc.setLocalDescription(await pc.createAnswer());
    sendToServer(pc.localDescription);

    log("Sending SDP answer");
  }

  this.handleCandidate = (candidate) => {
    var candidate = new RTCIceCandidate(candidate);
    log("Adding received ICE candidate: " + JSON.stringify(candidate));
    pc.addIceCandidate(candidate);
  }

  this.closeVideoCall = () => {
    log("Closing the call");

    if (pc) {
      log("Closing the peer connection");

      pc.onicecandidate = null;
      pc.oniceconnectionstatechange = null;
      pc.onicegatheringstatechange = null;
      pc.onsignalingstatechange = null;
      pc.ontrack = null;

      pc.getSenders().forEach(track => { pc.removeTrack(track); });
      
      if (remoteVideo) {
        remoteVideo.srcObject = null;
        remoteVideo.controls = false;
      }
      
      pc.close();
      pc = null;
    }
  }

  this.onicecandidate = (event) => {
    if (event.candidate) {
      log("Outgoing ICE candidate: " + event.candidate.candidate);
      sendToServer({
        type: "candidate",
        sdpMLineIndex: event.candidate.sdpMLineIndex,
        sdpMid: event.candidate.sdpMid,
        candidate: event.candidate.candidate
      });
    }
  };

  this.oniceconnectionstatechange = () => {
    log("ICE connection state changed to " + pc.iceConnectionState);
    switch(pc.iceConnectionState) {
      case "closed":
      case "failed":
      case "disconnected":
        hangUpCall();
        break;
    }
  };

  this.onicegatheringstatechange = () => {
    log("ICE gathering state changed to " + pc.iceGatheringState);
  };

  this.onsignalingstatechange = () => {
    log("WebRTC signaling state changed to: " + pc.signalingState);
    switch(pc.signalingState) {
      case "closed":
        hangUpCall();
        break;
    }
  };

  this.ontrack = (event) => {
    log("Track event");
    remoteVideo.srcObject = event.streams[0];
    remoteVideo.controls = true;
  };
  
};

export default DriverWebRTC;
