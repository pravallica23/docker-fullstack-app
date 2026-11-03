
const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "Node.js backend is running!",
  });
});

app.get("/api/info", (req, res) => {
  res.json({
    application: "Dockerized Full-Stack App",
    backend: "Node.js and Express",
    status: "Running successfully",
  });
});

if (require.main === module) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend running on port ${PORT}`);
  });
}

module.exports = app;
