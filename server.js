const https = require("https");
const fs = require("fs");
const PORT = 8443;
const options = {
  key: fs.readFileSync("certificate/server.key"),
  cert: fs.readFileSync("certificate/server.crt"),
};

fs.readFile("./public/index.html", (err, html) => {
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
      console.log(`App listening on port ${PORT}`);
    });
});
