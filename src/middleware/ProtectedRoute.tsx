// src/components/ProtectedRoute.js
import { ApiClient } from "@/customFetch/ApiClient";
import { getCookie } from "@/lib/utils";
import { useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

type props = {
    children: React.ReactNode;
    role: string;
    allowedRoles: string[];
}


const ProtectedRoute = ({ children, role, allowedRoles }: props) => {
    const dispatch = useDispatch()
    const token = getCookie('_at')
    const localUser = localStorage.getItem('localUser')

    const status = getCookie('_status')

    if (status === 'onboarding') {
        return <Navigate to="/register/complete-registeration" />
    }

    ApiClient.defaults.headers.common = {
        'Authorization': token ? `Bearer ${token}` : null
    }

    const handleGetMe = async () => {
        if (token) {
            const res = await dispatch(globalThis.$action.me())
            if (localUser) {
                return
            }
            if (res?.type?.includes('fulfilled')) {
                const { data } = res.payload
                localStorage.setItem('localUser', data)
            }
        }
    }

    useLayoutEffect(() => {
        handleGetMe()
    }, [])

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
