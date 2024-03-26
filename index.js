import express from "express";
import { createServer } from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const app = express();
const server = createServer(app);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(join(__dirname, "public")));

app.get("/", (req, res) => {
	// Log all the request url
	console.log(req.url);
	res.sendFile(join(__dirname, "index.html"));
});

server.listen(3000, () => {
	console.log("Server is running on port 3000");
	console.log("http://localhost:3000/");
});
