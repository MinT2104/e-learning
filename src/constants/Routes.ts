import CourseView from "@/pages/Course/CourseView";
import InstructorsView from "@/pages/Instructors/InstructorsView";
import LoginView from "@/pages/Login/LoginView";
import ProfileView from "@/pages/Profile/ProfileView";
import SignUpView from "@/pages/Signup/SignUpView";
import TaskDetailView from "@/pages/Tasks/TaskDetailView";
import TasksView from "@/pages/Tasks/TasksView";


export const routes = [
    // {
    //     path: "/",
    //     element: HomeView,
    //     allowedRoles: ["guest", "USER", "admin"],
    // },
    {
        path: "/",
        element: CourseView,
        allowedRoles: ["guest", "USER", "admin"],
    },
    {
        path: "/tasks",
        element: TasksView,
        allowedRoles: ["guest", "USER", "admin"],
    },
    {
        path: "/tasks/:id",
        element: TaskDetailView,
        allowedRoles: ["guest", "USER", "admin"],
    },
    {
        path: "/instructors",
        element: InstructorsView,
        allowedRoles: ["guest", "USER", "admin"],
    },
    {
        path: "/profile",
        element: ProfileView,
        allowedRoles: ["guest", "USER", "admin"],
    },
    //     {
    //         path: "/activity",
    //         element: ActivityView,
    //         allowedRoles: ["guest", "USER", "admin"],
    //     },

];


export const MappedAuthRoute: any = [
    {
        path: "/login",
        element: LoginView,
        allowedRoles: ["guest", "USER", "admin"],
    },
    {
        path: "/signup",
        element: SignUpView,
        allowedRoles: ["guest"],
    },
]