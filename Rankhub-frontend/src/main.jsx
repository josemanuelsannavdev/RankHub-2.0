import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Ranking from "./pages/ranking/RankingPage.jsx";
import RegisterPage from "./pages/register/RegisterPage.jsx";
import LoginPage from "./pages/login/LoginPage.jsx";
import OAuthCallbackPage from "./pages/login/OAuthCallbackPage.jsx";
import MainPage from "./pages/rankingsDashboard/RankingsDashboardPage.jsx";
import NotFoundPage from "./pages/notFound/NotFoundPage.jsx";
import { RankingProvider } from "./context/RankingContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import CreateGamePage from "./pages/createGamePage/CreateGamePage.jsx";
import ViewGamePage from "./pages/viewGamesPage/ViewGamePage.jsx";
import HistoricoPage from "./pages/historico/HistoricoPage.jsx";
import PlayerPage from "./pages/playerPage/PlayerPage.jsx";
import GamePage from "./pages/gamePage/GamePage.jsx";
import RankingMembersPage from "./pages/rankingMembers/RankingMembersPage.jsx";
import ChatModal from "./pages/chat/ChatModal.jsx";
import CreateEventPage from "./pages/createEventBetPage/CreateEventPage.jsx";
import ViewEventsPage from "./pages/viewEventsPage/ViewEventsPage.jsx";
import EventPage from "./pages/eventPage/EventPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <RankingProvider>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/oauth/callback" element={<OAuthCallbackPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/eventPage/:eventId" element={<EventPage />} />
              <Route path="/chat" element={<ChatModal />} />
              <Route path="/createEvent" element={<CreateEventPage />} />
              <Route path="/event" element={<EventPage />} />
              <Route path="/viewEventsPage" element={<ViewEventsPage />} />
              <Route path="/mainPage" element={<MainPage />} />
              <Route path="/ranking/:id" element={<Ranking />} />
              <Route path="/createGame" element={<CreateGamePage />} />
              <Route path="/viewGames" element={<ViewGamePage />} />
              <Route path="/historico" element={<HistoricoPage />} />
              <Route path="/playerPage/:playerId" element={<PlayerPage />} />
              <Route path="/gamePage/:gameId" element={<GamePage />} />
              <Route
                path="/ranking/:id/members"
                element={<RankingMembersPage />}
              />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ToastProvider>
      </RankingProvider>
    </BrowserRouter>
  </StrictMode>,
);
