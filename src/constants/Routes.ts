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
    //     allowedRoles: ["guest", "student", "teacher", "admin"],
    // },
    {
        path: "/",
        element: CourseView,
        allowedRoles: ["guest", "student", "teacher", "admin"],
    },
    {
        path: "/tasks",
        element: TasksView,
        allowedRoles: ["guest", "student", "teacher", "admin"],
    },
    {
        path: "/tasks/:id",
        element: TaskDetailView,
        allowedRoles: ["guest", "student", "teacher", "admin"],
    },
    {
        path: "/instructors",
        element: InstructorsView,
        allowedRoles: ["guest", "student", "teacher", "admin"],
    },
    {
        path: "/profile",
        element: ProfileView,
        allowedRoles: ["guest", "student", "teacher", "admin"],
    },
    //     {
    //         path: "/activity",
    //         element: ActivityView,
    //         allowedRoles: ["guest", "student", "teacher", "admin"],
    //     },

];


export const MappedAuthRoute: any = [
    {
        path: "/login",
        element: LoginView,
        allowedRoles: ["guest"],
    },
    {
        path: "/signup",
        element: SignUpView,
        allowedRoles: ["guest"],
    },
]