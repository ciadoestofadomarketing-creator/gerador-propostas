import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router";
import { EditorPage } from "./pages/EditorPage";
import { HomePage } from "./pages/HomePage";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/editor/:id" element={<EditorPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
);
