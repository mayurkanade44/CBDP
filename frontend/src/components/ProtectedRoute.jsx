import { Navigate } from "react-router-dom";
import { useDataContext } from "../context/data_context";

const ProtectedRoute = ({ children }) => {
  const { user } = useDataContext();
  if (user) {
    return children;
  }
  return <Navigate to="/"></Navigate>;
};

export default ProtectedRoute;
