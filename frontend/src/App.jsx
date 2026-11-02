
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [health, setHealth] = useState(null);
  const [info, setInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBackendData() {
      try {
        const healthResponse = await fetch("/api/health");
        const infoResponse = await fetch("/api/info");

        if (!healthResponse.ok || !infoResponse.ok) {
          throw new Error("Backend API request failed");
        }

        const healthData = await healthResponse.json();
        const infoData = await infoResponse.json();

        setHealth(healthData);
        setInfo(infoData);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchBackendData();
  }, []);

  return (
    <main>
      <h1>Dockerized Full-Stack Application</h1>

      <h2>Frontend Status</h2>
      <p>React frontend is running successfully!</p>

      <h2>Backend Health</h2>
      {health ? (
        <p>{health.message}</p>
      ) : (
        <p>Loading backend health...</p>
      )}

      <h2>Backend Information</h2>
      {info && (
        <div>
          <p>Application: {info.application}</p>
          <p>Backend: {info.backend}</p>
          <p>Status: {info.status}</p>
        </div>
      )}

      {error && <p>Error: {error}</p>}
    </main>
  );
}

export default App;
