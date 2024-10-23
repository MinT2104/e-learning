import { ApiClient } from "@/customFetch/ApiClient";
import { getCookie } from "@/lib/utils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

type Props = {
    children: React.ReactNode;
    role: string;
    allowedRoles: string[];
};

const ProtectedRoute = ({ children, role, allowedRoles }: Props) => {
    const dispatch = useDispatch();
    const token = getCookie('_at');
    const status = getCookie('_status');
    const localUser = localStorage.getItem('localUser');
    const navigate = useNavigate();

    // Set token in Authorization header
    useEffect(() => {
        if (token) {
            ApiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, [token]);

    const handleGetMe = async () => {
        if (token && !localUser) {
            const res = await dispatch(globalThis.$action.me());
            if (res?.type?.includes('fulfilled')) {
                const { data } = res.payload;
                localStorage.setItem('localUser', JSON.stringify(data));
            }
        }
    };

    useEffect(() => {
        handleGetMe();
    }, []);

    if (status === 'onboarding') {
        return <Navigate to="/register/completeregistration" replace />;

    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
