import express from "express";
import http from "http";
import { Server as socketio } from "socket.io";
import { v4 } from "uuid";

const app = express();

const server = http.createServer(app);
const io = new socketio(server);

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(`/${v4()}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId) => {
    let userId = socket.id;
    //join the room with this id
    socket.join(roomId);
    //send the message to the room's other users that a new user has joined
    socket.to(roomId).emit("user-connected", userId);
  });
});

server.listen(3000, () => {
  console.log("running on port 3000.");
});
