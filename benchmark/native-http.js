const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 4000;
const http = require("http");

http
  .createServer((req, res) => {
    res.end("Hello World");
  })
  .listen(PORT, () => {
    console.log(`Server is runing at http://${HOST}:${PORT}`);
  });
