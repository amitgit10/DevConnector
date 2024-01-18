import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) navigate("/login");
  }, [isAuthenticated, loading]);
  return children;
}
export default ProtectedRoute;
