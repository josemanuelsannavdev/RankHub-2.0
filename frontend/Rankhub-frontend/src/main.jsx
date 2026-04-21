import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Ranking from "./pages/rankingMain/RankingPage.jsx";
import RegisterPage from "./pages/register/RegisterPage.jsx";
import LoginPage from "./pages/login/LoginPage.jsx";
import OAuthCallbackPage from "./pages/login/OAuthCallbackPage.jsx";
import MainPage from "./pages/mainPage/MainPage.jsx";
import NotFoundPage from "./pages/notFound/NotFoundPage.jsx";
import { RankingProvider } from "./context/RankingContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <RankingProvider>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/oauth/callback" element={<OAuthCallbackPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/mainPage" element={<MainPage />} />
              <Route path="/ranking/:id" element={<Ranking />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ToastProvider>
      </RankingProvider>
    </BrowserRouter>
  </StrictMode>,
);
