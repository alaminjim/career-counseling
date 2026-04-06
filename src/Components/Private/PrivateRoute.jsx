import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContextUser } from "../Auth/AuthContext";
import Loading from "../Loading/Loading";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContextUser);

  if (loading) {
    return <Loading></Loading>;
  }

  if (user) {
    return children;
  }

  return <Navigate state={{ from: location.pathname }} to="/login"></Navigate>;
};

export default PrivateRoute;
