const express = require("express");
const app = express();
const cors = require("cors");
const { readFileSync } = require("fs");

const config = require("./public/js/config");
const HOST = process.env.HOST || config.host;
const PORT = process.env.PORT || config.port;

const options = {
  key: readFileSync("certificate/server.key"),
  cert: readFileSync("certificate/server.crt"),
};

const todoItems = JSON.parse(readFileSync("./public/static/data.json", "utf8"));

app.use(cors());

app.get("/items", (req, res) => {
  res.send(todoItems);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
