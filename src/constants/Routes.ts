import HomeView from "@/pages/Home/HomeView";
import LoginView from "@/pages/Login/LoginView";
import UserView from "@/pages/User/UserView";

export const routes = [
    {
        path: "/",
        element: HomeView,
      allowedRoles: ["guest", "USER", "admin"],
    },
    {
        path: "/user",
        element: UserView,
        allowedRoles: ["guest", "USER", "admin"],
    },
];


export const MappedAuthRoute: any = [
    {
        path: "/login",
        element: LoginView,
        allowedRoles: ["guest", "USER", "admin"],
    },
]