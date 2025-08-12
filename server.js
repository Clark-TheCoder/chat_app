import express from "express";
import http from "http";
import { Server as socketio } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const app = express();
const server = http.createServer(app);
const io = new socketio(server);

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(`/${uuidv4()}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId) => {
    const userId = socket.id;
    socket.join(roomId);
    console.log(`User ${userId} joined room ${roomId}`);

    // Tell other users in the room that a new user has connected
    socket.to(roomId).emit("user-connected", userId);
  });

  // When an offer is receieved, send the offer to the targeted user
  socket.on("offer", (data) => {
    const { target } = data;
    console.log(`Forwarding offer from ${socket.id} to ${target}`);
    io.to(target).emit("offer", data);
  });

  // When the answer is revceieved, send the answer to the targeted user
  socket.on("answer", (data) => {
    const { target } = data;
    console.log(`Forwarding answer from ${socket.id} to ${target}`);
    io.to(target).emit("answer", data);
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
