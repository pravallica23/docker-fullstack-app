
const { test } = require("node:test");
const assert = require("node:assert/strict");
const app = require("../server");

test("GET /api/health returns successful response", async () => {
  const server = app.listen(0);

  try {
    const address = server.address();
    const response = await fetch(
      `http://127.0.0.1:${address.port}/api/health`
    );

    const data = await response.json();

    assert.equal(response.status, 200);
    assert.equal(data.status, "success");
    assert.equal(
      data.message,
      "Node.js backend is running!"
    );
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
});

test("GET /api/info returns application information", async () => {
  const server = app.listen(0);

  try {
    const address = server.address();
    const response = await fetch(
      `http://127.0.0.1:${address.port}/api/info`
    );

    const data = await response.json();

    assert.equal(response.status, 200);
    assert.equal(
      data.application,
      "Dockerized Full-Stack App"
    );
    assert.equal(
      data.backend,
      "Node.js and Express"
    );
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
});
