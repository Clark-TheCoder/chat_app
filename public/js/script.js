import { createVideo } from "/js/createVideo.js";

const socket = io("/");

let localStream;
const peers = {};
const videoElements = {};

async function start() {
  try {
    console.log("Requesting local media...");

    // Get local streams
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    // Create video UI element
    const myVideo = createVideo();
    myVideo.muted = true; // mute to prevent feedback
    myVideo.srcObject = localStream;
    videoElements[socket.id] = myVideo;

    console.log("Local media stream obtained.");
    console.log("Joining room:", roomID);

    // Join room
    socket.emit("join-room", roomID);
  } catch (error) {
    console.error("Error accessing media devices:", error);
  }
}

start();

function createPeerConnection(userId) {
  // Create peer connection
  const peerConnection = new RTCPeerConnection();

  // Add all local tracks to this peer connection
  localStream
    .getTracks()
    .forEach((track) => peerConnection.addTrack(track, localStream));

  // When remote tracks arrives, create or update the video element
  peerConnection.ontrack = (event) => {
    if (!videoElements[userId]) {
      const video = createVideo();
      video.srcObject = event.streams[0];
      videoElements[userId] = video;
    } else {
      videoElements[userId].srcObject = event.streams[0];
    }
  };

  return peerConnection;
}

// When a new user connects, create a peer connection and send offer
socket.on("user-connected", async (userId) => {
  console.log("User connected:", userId);

  const peerConnection = createPeerConnection(userId);
  peers[userId] = peerConnection;

  // Create offer
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  // Send offer
  socket.emit("offer", {
    target: userId,
    caller: socket.id,
    sdp: peerConnection.localDescription,
  });
  console.log(`Sent offer to user ${userId}`);
});
