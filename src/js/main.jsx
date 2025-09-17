import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// Styles
import "../styles/index.css";

// Components
import Home from "./components/Home";

// Create root
const root = createRoot(document.getElementById("root"));

// Render the app
root.render(
  <StrictMode>
    <Home />
  </StrictMode>
);
