// src/components/ProtectedRoute.js
// import { getCookie } from "@/lib/utils";
import { getCookie } from "@/lib/utils";
import React from "react";
import { Navigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

type props = {
    children: React.ReactNode;
}

const AuthRoute = ({ children }: props) => {
    const token = getCookie('_at')
    if (token) {
        return <Navigate to="/" />;
    }

    return children;
};

export default AuthRoute;
