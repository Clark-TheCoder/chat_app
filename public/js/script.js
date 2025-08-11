const socket = io("/");

socket.emit("join-room", roomID);

socket.on("user-connected", (userId) => {
  console.log(userId);
});
