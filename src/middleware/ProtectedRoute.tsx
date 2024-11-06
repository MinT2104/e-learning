import { ApiClient } from "@/customFetch/ApiClient";
import { getCookie } from "@/lib/utils";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, } from "react-router-dom";

type Props = {
    children: React.ReactNode;
    role: string;
    allowedRoles: string[];
};

const ProtectedRoute = ({ children, role, allowedRoles }: Props) => {
    const dispatch = useDispatch();
    const token = getCookie('_at');

    ApiClient.defaults.headers.common = {
        'Authorization': token ? `Bearer ${token}` : null,
    };

    const handleGetMe = async () => {
        if (token) {
            await dispatch(globalThis.$action.me());
        }
    };

    useLayoutEffect(() => {
        handleGetMe();
    }, [token]);


    if (!allowedRoles.includes(role)) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
