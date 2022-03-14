import React from "react"
import { Route, Outlet, Navigate } from "react-router-dom"

const useAuth = () => {
  const user=sessionStorage.getItem('user')
  if (user){
    return true;
  }
  else{
    return false;
  }
}

const PrivateRoute = () => {
  const currentUser = useAuth();

  return currentUser ? <Outlet/> : <Navigate to="/login" />;
}

export default PrivateRoute;