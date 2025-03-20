import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  if (location.pathname === "admin") {
    if (!isAuthenticated) {
      return <Navigate to="/auth" />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/home" />;
      }
    }
  }

 


  if (
    isAuthenticated &&
    (location.pathname.includes("auth"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/home" />;
    }
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/home" />;
  }



  return <>{children}</>;
}

export default CheckAuth;