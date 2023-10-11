const http = require("http");
const app = require("./app.js");

const PORT = process.env.PORT || 3000;
app.set("port", PORT);
const server = http.createServer(app);

console.log(`listening on port ${PORT}`);
server.listen(PORT);
