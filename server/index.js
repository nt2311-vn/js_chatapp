import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
	cors: {
		origin: "*",
	},
});
const messageHistory = [];

try {
	io.on("connection", (socket) => {
		console.log(`User ${socket.id} connected`);
		socket.emit("messageHistory", messageHistory);

		socket.on("message", (message) => {
			console.log(message);
			messageHistory.push(message);
			console.log(messageHistory);
			io.emit("message", message);
		});
	});
} catch (err) {
	console.error(err);
}

httpServer.listen(3500, () => {
	console.log("Listening on port 3500");
});
