import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />

    {/* ✅ Toast container (ONLY ONCE) */}
    <Toaster
      position="top-center"
      richColors
      closeButton
    />
  </React.StrictMode>
);
