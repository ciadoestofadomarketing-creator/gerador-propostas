import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router";
import { EditorPage } from "./pages/EditorPage";
import { StartPage } from "./pages/StartPage";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/nova" element={<StartPage fresh />} />
        <Route path="/editor/:id" element={<EditorPage />} />
        <Route path="*" element={<StartPage />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
);
