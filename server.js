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

server.listen(3000, () => {
  console.log("running on port 3000.");
});
