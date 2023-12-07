const express = require("express");
const app = express();
const https = require("https");
const fs = require("fs");

const config = require("./public/js/config");
const HOST = process.env.HOST || config.host;
const PORT = process.env.PORT || config.port;

const options = {
  key: fs.readFileSync("certificate/server.key"),
  cert: fs.readFileSync("certificate/server.crt"),
};

const todoItems = [{ id: 0, value: "React", done: false, delete: false }];

app.get("/items", (req, res) => {
  res.send(todoItems);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
