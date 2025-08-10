<!-- REAL-TIME VIDEO CHAT APPLICATION -->

A WebRTC application enabling secure, video and audio communication between users in generated rooms. Uses socket.io for signaling, uuid for unique room generation, and webrtc with ICE servers for reliable peer-to-peer connections.

---

<!-- OVERVIEW -->

This application allows users to:

- Join unique video chat rooms via unique links.
- Establish direct peer-to-peer connections for video/audio streaming.
- Maintain smooth connectivity even across NAT/firewall configurations via ICE servers.

---

<!-- FEATURES -->

<!-- Generated Rooms  -->

Each call occurs in an isolated room identified by a UUID.

<!-- **Real-Time Streaming -->

Peer-to-peer video/audio powered by WebRTC.

<!-- Socket.IO Signaling  -->

Handles SDP offer/answer exchange and ICE candidate relay.

<!-- STUN Support -->

Ensures connectivity behind NAT/firewalls.

---

<!-- STACK -->

<!-- Frontend -->

- HTML5, CSS3, EJS, JavaScript (ES6+)
- WebRTC API
- Socket.IO Client

<!-- Backend -->

- Node.js
- Express.js
- Socket.IO Server
- UUID for room generation

<!-- Networking -->

- STUN servers for NAT traversal
- ICE candidates for peer connection establishment

---

<!-- TO RUN ON YOUR LOCAL COMPUTER -->

<!-- Clone the Repo: -->

```bash
git clone https://github.com/Clark-TheCoder/chat_app.git
cd chat_app
```
