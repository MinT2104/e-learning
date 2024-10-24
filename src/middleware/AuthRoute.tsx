import { getCookie } from "@/lib/utils";
import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
    role: string;
    allowedRoles: string[];
};

const AuthRoute = ({ children, allowedRoles, role }: Props) => {
    const token = getCookie('_at');
    const status = getCookie('_status');

    console.log("Status cookie value:", status);

    if (status === 'onboarding') {
        return <Navigate to="/register/completeregistration" />;
    }

    if (token) {
        return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default AuthRoute;
