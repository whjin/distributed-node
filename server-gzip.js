#!/use/bin/env node

const zlib = require("zlib");
const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    const raw = fs.createReadStream(__dirname + "/public/index.html");
    const acceptEncoding = req.headers["accept-endcoding"] || "";
    res.setHeader("Content-Type", "text/html");
    console.log(acceptEncoding);

    if (acceptEncoding.includes("gzip")) {
      console.log("encoding with gzip");
      res.setHeader("Content-Type", "gzip");
      raw.pipe(zlib.createGzip()).pipe(res);
    } else {
      console.log("no encoding");
      raw.pipe(res);
    }
  })
  .listen(process.env.PORT || 1337);

console.log(
  `Server is running on http://localhost:${process.env.PORT || 1337}`
);
