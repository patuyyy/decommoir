import { Navigate } from "react-router-dom";

const AuthorizedRoute = ({ children }) => {
  const savedUser = localStorage.getItem("user");

  if (savedUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AuthorizedRoute;
