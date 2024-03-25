const ws = require("ws");

const port = "3000";
const server = new ws.Server({ port: port });

server.on("connection", (socket) => {
	socket.on("message", (message) => {
		console.log(message);
		socket.send(message);
	});
});
