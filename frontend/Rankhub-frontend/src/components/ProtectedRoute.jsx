import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AUTH_EVENT_NAME, hasSessionToken } from "../services/session";

function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(hasSessionToken);

  useEffect(() => {
    const syncAuthState = () => setIsAuthenticated(hasSessionToken());

    globalThis.addEventListener(AUTH_EVENT_NAME, syncAuthState);
    globalThis.addEventListener("storage", syncAuthState);

    return () => {
      globalThis.removeEventListener(AUTH_EVENT_NAME, syncAuthState);
      globalThis.removeEventListener("storage", syncAuthState);
    };
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
