#!/usr/bin/env node

const fs = require("fs");
const server = require("fastify")({
  https: {
    key: fs.readFileSync(__dirname + '/tls/basic-private-key.key'),
    cert: fs.readFileSync(__dirname + '/../shared/tls/basic-certificate.cert')
  }
});
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "4000";

console.log(`worker pid=${process.pid}`);

server.get("/recipes/:id", async (req, res) => {
  console.log(`worker request pid=${process.pid}`);

  const id = Number(req.params.id);
  if (id !== 42) {
    res.statusCode = 404;
    return { err: "not_found" };
  }
  return {
    producer_pid: process.pid,
    recipe: {
      id,
      name: "滕王阁饯别序",
      steps: "豫章故郡，洪都新府",
      ingredients: [
        { id: 1, name: "王勃", quantity: "李贺" },
        { id: 2, name: "王维", quantity: "李煜" },
      ],
    },
  };
});

server.listen(PORT, HOST, () => {
  console.log(`Producer running at https://${HOST}:${PORT}`);
});
