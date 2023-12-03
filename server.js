const https = require("https");
const fs = require("fs");

const config = require("./public/js/config");
const HOST = process.env.HOST || config.host;
const PORT = process.env.PORT || config.port;

const options = {
  key: fs.readFileSync("certificate/server.key"),
  cert: fs.readFileSync("certificate/server.crt"),
};

fs.readFile("./public/html/index.html", (err, html) => {
  if (err) {
    throw err;
  }
  https
    .createServer(options, (req, res) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(html);
      res.end();
    })
    .listen(8443, () => {
      console.log(`Server is running at https://${HOST}:${PORT}`);
    });
});
