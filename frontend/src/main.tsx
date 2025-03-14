import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// const checkBackend = async () => {
//   try {
//     const response = await fetchApi("/api/health");
//     if (!response.ok) {
//       alert("Backend not reachable");
//       throw new Error("Backend not reachable");
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// checkBackend();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
