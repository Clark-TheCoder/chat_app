import { createVideo } from "/js/createVideo.js";

const socket = io("/");

let localStream;

async function start() {
  try {
    //get and append the streams of the local user to the room
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localStream = stream;
    const myVideo = createVideo();
    myVideo.muted = true; //mute to prevent feedback
    myVideo.srcObject = stream;

    //join room
    socket.emit("join-room", roomID);
  } catch (error) {
    console.error("Error accessing media devices:", error);
  }
}

start();

socket.on("user-connected", (userId) => {
  //create peerConnection
  const peerConnection = new RTCPeerConnection();

  // Add your local tracks
  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });
});
