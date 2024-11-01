import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { MappedAuthRoute, MappedAuthRouteType, routes } from "@/constants/Routes";
import AuthRoute from "@/middleware/AuthRoute";
import AuthLayout from "@/Layouts/AuthLayout";
import DefaultLayout from "@/Layouts/DefaultLayout";
import ProtectedRoute from "@/middleware/ProtectedRoute";
import NotFound from "@/pages/NotFound/NotFound";

const RouterWrapper = () => {
    const { role } = useSelector((state: RootState) => state.user);

    return (
        <Routes>
            {MappedAuthRoute.map((route: MappedAuthRouteType, index: number) => (
                <Route
                    key={index}
                    path={route.path}
                    element={
                        <AuthRoute role={role} allowedRoles={route.allowedRoles}>
                            {route.isUsedLayout ? (
                                <AuthLayout>
                                    {<route.element />}
                                </AuthLayout>
                            ) : (
                                <route.element />
                            )}
                        </AuthRoute>
                    }
                />
            ))}
            {routes.map((route: MappedAuthRouteType, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={
                        <ProtectedRoute role={role} allowedRoles={route.allowedRoles}>
                            {route.isUsedLayout ? (
                                <DefaultLayout>
                                    {<route.element />}
                                </DefaultLayout>
                            ) : (
                                <route.element />
                            )}
                        </ProtectedRoute>
                    }
                />
            ))}
            <Route path="*" element={<NotFound />} /> {/* Route Not Found */}
        </Routes>
    );
};

export default RouterWrapper;
