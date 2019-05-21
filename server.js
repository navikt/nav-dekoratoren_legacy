const express = require("express");

const app = express();
app.use(express.static("frontend/build/"));
// app.use(express.static(__dirname + '/frontend/build/static/'));

const isProduction = process.env.NODE_ENV === "production";

const allowedOrigin = isProduction
  ? `(http|https)://(.*).nav.no`
  : `http://localhost:8080`;

// Express settings

app.use((req, res, next) => {
  const origin = req.get("origin");
  if (origin && origin.match(allowedOrigin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
  }
  next();
});

// app.get("/static/", (req, res) => res.status("/build", { root: "./frontend" }));

app.get("/fragmenter/", (req, res) =>
  res.sendFile("/index.html", { root: "./frontend/build" })
);

app.get("/isAlive", (req, res) => res.sendStatus(200));
app.get("/isReady", (req, res) => res.sendStatus(200));
app.get("/", (req, res) => res.sendStatus(200));

app.listen(8080, () => console.log(`App listening on port: 8080`));
