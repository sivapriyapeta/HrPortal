import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { loggedIn } from "./Context";

const ProtectedRoute = () => {
    // const isLoggedIn = window.localStorage.getItem("isloggedIn");
    const [loginStatus] = useContext(loggedIn);
    return loginStatus.isLoggedIn === true ? <Outlet/> : <Navigate to="/login"/>;
}

export default ProtectedRoute;