import { Navigate } from "react-router-dom";
import useAuthStor from "./Stor/UseAuthStor";

export default function ProtectedRoute({ children }) {
  const token = useAuthStor((state) => state.token);

  if (!token) {
   
    return <Navigate to="/login" replace />;
  }

  return children;
}