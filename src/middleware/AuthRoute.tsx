// src/components/ProtectedRoute.js
// import { getCookie } from "@/lib/utils";
import { getCookie } from "@/lib/utils";
import React from "react";
import { Navigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

type props = {
    children: React.ReactNode;
    role: string;
    allowedRoles: string[];
}

const AuthRoute = ({ children, allowedRoles, role }: props) => {
    const token = getCookie('_at')
    const status = getCookie('_status')

    if (status === 'onboarding') {
        return <Navigate to="/register/complete-registeration" />
    }

    if (token) {
        return <Navigate to="/" />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default AuthRoute;
