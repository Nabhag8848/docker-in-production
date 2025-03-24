const express = require("express");
const app = express();

app.get("/", (_req, res) => {
  return res.send("Bye there !");
});

app.listen(8080, () => {
  console.log("listeining on port 8080");
});
