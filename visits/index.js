const express = require("express");
const redis = require("redis");
const process = require("process");

const app = express();
const client = redis.createClient({
  url: "redis://redis-server:6379",
});

client.connect().then(() => {
  console.log("connected");
});

app.get("/", async (req, res) => {
  try {
    process.exit(0);
    const visits = (await client.get("visits")) ?? "0";
    await client.set("visits", parseInt(visits) + 1);
    return res.status(200).send(`Number: ${visits}`);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
});

app.listen(8080, () => {
  console.log("started");
});

client.on("connection", () => {
  console.log("connected to redis");
});

client.on("end", () => {
  console.log("Redis connection ended");
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});
