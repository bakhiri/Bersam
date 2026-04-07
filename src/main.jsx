import React from "react";
import ReactDOM from "react-dom/client";
import App, { createShapes } from "./App";
import "./index.css";

// Inject slide animation styles at startup
const SLIDE_STYLES = `
@keyframes slideRight {
  0%   { opacity: 0; transform: translateX(30px); }
  100% { opacity: 1; transform: translateX(0); }
}
.slide-fade {
  animation: slideRight 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  will-change: transform, opacity;
}
`;
if (!document.getElementById("slide-in-styles")) {
  const s = document.createElement("style");
  s.id = "slide-in-styles";
  s.textContent = SLIDE_STYLES;
  document.head.appendChild(s);
}

// Randomly reposition floating shapes on window resize
window.addEventListener("resize", () => {
  document.querySelectorAll("#shapes-container .shape").forEach((shape) => {
    shape.style.left = Math.random() * 100 + "%";
    shape.style.top = Math.random() * 100 + "%";
  });
});

// Initialize background shapes on page load
if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", createShapes);
} else {
  createShapes();
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
