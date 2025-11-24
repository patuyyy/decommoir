import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const savedUser = localStorage.getItem("user");
  if (!savedUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
