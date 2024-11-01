import { getCookie } from "@/lib/utils";
import { RootState } from "@/redux/store";
import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

type props = {
    children: React.ReactNode;
    role: string;
    allowedRoles: string[];
}

const AuthRoute = ({ children, allowedRoles, role }: props) => {
    const navigate = useNavigate()
    const token = getCookie('_at');
    const dispatch = useDispatch();

    const { authUser } = useSelector((state: RootState) => state.user);
    console.log(authUser)

    const handleGetMe = async () => {
        if (token) {
            await dispatch(globalThis.$action.me());
        }
    };

    useLayoutEffect(() => {
        handleGetMe();
    }, [token]);

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
