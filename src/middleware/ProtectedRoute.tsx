import { ApiClient } from "@/customFetch/ApiClient";
import { getCookie } from "@/lib/utils";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

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

    const ProtectedRoute = ({ children, role, allowedRoles }: props) => {
        const dispatch = useDispatch()

        const token = getCookie('_at')
        const localUser = localStorage.getItem('localUser')

        ApiClient.defaults.headers.common = {
            'Authorization': token ? `Bearer ${token}` : null
        }

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

<<<<<<< HEAD
        return <>{children}</>;
=======

    return children;
>>>>>>> parent of 82583aa (Merge remote-tracking branch 'origin/main' into dev/quan)
    };

    export default ProtectedRoute;
