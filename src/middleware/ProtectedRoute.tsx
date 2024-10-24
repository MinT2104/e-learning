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
    const localUser = localStorage.getItem('localUser');
    const navigate = useNavigate();
    const { authUser } = useSelector((state: RootState) => state.user);
    const status = getCookie('_status');

    const checkTokenValid = (token: string | null): boolean => {
        if (!token) return false;

        try {
            const payload = JSON.parse(atob(token.split('.')[1])); // Giải mã payload từ JWT token
            const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại tính bằng giây
            return payload.exp > currentTime; // Kiểm tra xem token có hết hạn không
        } catch (e) {
            return false;
        }
    };

    ApiClient.defaults.headers.common = {
        'Authorization': token ? `Bearer ${token}` : null,
    };

    const handleGetMe = async () => {
        if (token) {
            const res = await dispatch(globalThis.$action.me());
            if (localUser) {
                return;
            }
            if (res?.type?.includes('fulfilled')) {
                const { data } = res.payload;
                localStorage.setItem('localUser', JSON.stringify(data));
            }
        }
    };

    useLayoutEffect(() => {
        handleGetMe();
    }, [token, dispatch]);

    useEffect(() => {
        if (!authUser || !checkTokenValid(token)) {
            navigate("/");
        } else if (!allowedRoles.includes(authUser.role)) {
            navigate("/login");
        } else if (status === 'onboarding') {
            navigate("/register/complete-registeration");
        }
    }, [authUser, token, status, allowedRoles, navigate]);

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
