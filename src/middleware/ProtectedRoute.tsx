// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";

type props = {
    children: React.ReactNode;
    role: string;
    allowedRoles: string[];
}


const ProtectedRoute = ({ children, role, allowedRoles }: props) => {
    // const dispatch = useDispatch()

    // const token = getCookie('_at')
    
    // ApiClient.defaults.headers.common = {
    //     'Authorization': token ? `Bearer ${token}` : null
    // }

    // const handleGetMe = async () => {
    //     if (token) await dispatch(globalThis.$action.me())
    // }

    // useEffect(() => {
    //     handleGetMe()
    // }, [])

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/login" replace />;
    }


    return children;
};

export default ProtectedRoute;
