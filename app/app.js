import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
const socket = io("ws://localhost:3500");

const sendMessage = (e) => {
	e.preventDefault();
	const input = document.querySelector("input");

	if (input.value) {
		socket.emit("message", {
			text: input.value,
			id: socket.id,
			timestamp: new Date(),
		});

		input.value = "";
	}

	input.focus();
};

document.querySelector("form").addEventListener("submit", sendMessage);

socket.on("message", ({ timestamp, text }) => {
	const li = document.createElement("li");
	li.textContent = `${new Date(timestamp).toLocaleTimeString()}: ${text}`;
	document.querySelector("ul").appendChild(li);
});
