import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Ranking from "./pages/rankingMain/RankingPage.jsx";
import RegisterPage from "./pages/register/RegisterPage.jsx";
import LoginPage from "./pages/login/LoginPage.jsx";
import MainPage from "./pages/mainPage/MainPage.jsx";
import { RankingProvider } from "./context/RankingContext.jsx";
import { ToastContainer } from "react-toastify";
import { ToastProvider } from "./context/ToastContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <RankingProvider>
        <ToastProvider>
          <ToastContainer />
          <Routes>
            <Route path="/prueba" element={<App />} />
            <Route path="*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/mainPage" element={<MainPage />} />
            <Route path="/ranking/:id" element={<Ranking />} />
          </Routes>
        </ToastProvider>
      </RankingProvider>
    </BrowserRouter>
  </StrictMode>,
);
