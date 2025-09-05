import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("auth");
  console.log(!isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [children, isAuthenticated, navigate]);
  return <>{isAuthenticated ? children : null}</>;
}

export default ProtectedRoute;
