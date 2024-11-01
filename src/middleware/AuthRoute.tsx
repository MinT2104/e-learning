import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

type props = {
    children: React.ReactNode;
    role: string;
    allowedRoles: string[];
}

const AuthRoute = ({ children, allowedRoles, role }: props) => {
    const navigate = useNavigate()

    const { authUser } = useSelector((state: RootState) => state.user);
    console.log(authUser)

    if (authUser) {
        if (authUser.role === 'teacher' && authUser.status === 'onboarding') {
            navigate('/register/complete-registeration')
            console.log('alo')
        } else {
            navigate('/');
        }
    }

    // if (token) {
    //     return <Navigate to="/" />;
    // }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default AuthRoute;
