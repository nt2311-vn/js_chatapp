import express from "express";
import { createServer } from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(join(__dirname, "public")));

app.get("/", (req, res) => {
	console.log(req.url);
	res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
	console.log("a user connected");

	socket.on("chat message", (msg) => {
		console.log`message: ${msg}`;
		io.emit("chat message", msg);
	});

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

server.listen(3000, () => {
	console.log("Server is running on port 3000");
	console.log("http://localhost:3000/");
});
