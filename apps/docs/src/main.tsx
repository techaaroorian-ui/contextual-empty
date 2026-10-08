import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

document.body.classList.add("aar-page-reset");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
