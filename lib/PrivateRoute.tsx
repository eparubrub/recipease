// import React from "react"
// import {Outlet, Navigate } from "react-router-dom"

export const useAuth = () => {
  const user = sessionStorage.getItem("user");
  if (user) {
    return true;
  } else {
    return false;
  }
};

// const PrivateRoute = () => {
//   const currentUser = useAuth();

//   return currentUser ? <Outlet/> : <Navigate to="/login" />;
// }

// export default PrivateRoute;
