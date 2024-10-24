import { getCookie } from "@/lib/utils";
import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
<<<<<<< HEAD
    role: string;
    allowedRoles: string[];
};

const AuthRoute = ({ children, allowedRoles, role }: Props) => {
    const token = getCookie('_at');
    const status = getCookie('_status');

    console.log("Status cookie value:", status);

    if (status === 'onboarding') {
        return <Navigate to="/register/completeregistration" />;
    }

=======
}

const AuthRoute = ({ children }: props) => {
    const token = getCookie('_at')
>>>>>>> parent of 82583aa (Merge remote-tracking branch 'origin/main' into dev/quan)
    if (token) {
        return <Navigate to="/" replace />;
    }

<<<<<<< HEAD
    if (!allowedRoles.includes(role)) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
=======
    return children;
>>>>>>> parent of 82583aa (Merge remote-tracking branch 'origin/main' into dev/quan)
};

export default AuthRoute;
