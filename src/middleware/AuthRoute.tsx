import { getCookie } from "@/lib/utils";
import { RootState } from "@/redux/store";
import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

type props = {
    children: React.ReactNode;
    role: string;
    allowedRoles: string[];
}

const AuthRoute = ({ children, allowedRoles, role }: props) => {
    let token = '';

    useEffect(() => {
        handleCheckToken
    }, [])

    const handleCheckToken = () => {
        token = getCookie('_at')
        if (token) {
            return <Navigate to="/" replace />
        }
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/404" replace />;
    }

    return children;
};

export default AuthRoute;
