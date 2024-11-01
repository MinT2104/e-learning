import { ApiClient } from "@/customFetch/ApiClient";
import { getCookie } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
    role: string;
    allowedRoles: string[];
};

const ProtectedRoute = ({ children, role, allowedRoles }: Props) => {
    const dispatch = useDispatch();
    const token = getCookie('_at');
    const navigate = useNavigate();
    const { authUser } = useSelector((state: RootState) => state.user);

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

    useEffect(() => {
        if (authUser) {
            if (authUser.role === 'teacher' && authUser.status === 'onboarding') {
                navigate('/register/complete-registeration')
                console.log('alo')
            } else {
                navigate('/');
            }
        }
    }, [authUser])

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
