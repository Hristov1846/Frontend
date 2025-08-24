import React from "react";
import { Navigate } from "react-router-dom";

// ⚠️ Тук е опростена версия — може да се връзва с контекст или Redux
function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user")); // примерно пазим user в localStorage

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
