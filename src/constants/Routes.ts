import CourseDetailView from "@/pages/Course/CourseDetailView";
import CourseVideo from "@/pages/Course/CourseVideo";
import CourseView from "@/pages/Course/CourseView";
import InstructorForm from "@/pages/Instructors/InstructorForm";
import InstructorsView from "@/pages/Instructors/InstructorsView";
import LoginView from "@/pages/Login/LoginView";
import MyCourseView from "@/pages/MyCourse/MyCourseView";
import ProfileView from "@/pages/Profile/ProfileView";
import SignUpView from "@/pages/Signup/SignUpView";
import TaskDetailView from "@/pages/Tasks/TaskDetailView";
import TasksView from "@/pages/Tasks/TasksView";
import { FC } from "react";


export const routes: MappedAuthRouteType[] = [
    // {
    //     path: "/",
    //     element: HomeView,
    //     allowedRoles: ["guest", "student", "teacher", "admin"],
    // },
    {
        path: "/",
        element: CourseView,
        allowedRoles: ["guest", "student", "teacher", "admin"],
        isUsedLayout: true
    },
    {
        path: "/my-course",
        element: MyCourseView,
        allowedRoles: ["guest", "student", "teacher", "admin"],
        isUsedLayout: true
    },
    {
        path: "/tasks",
        element: TasksView,
        allowedRoles: ["guest", "student", "teacher", "admin"],
        isUsedLayout: true

    },
    {
        path: "/tasks/:id",
        element: TaskDetailView,
        allowedRoles: ["guest", "student", "teacher", "admin"],
        isUsedLayout: true
    },
    {
        path: "/instructors",
        element: InstructorsView,
        allowedRoles: ["guest", "student", "teacher", "admin"],
        isUsedLayout: true

    },
    {
        path: "/profile",
        element: ProfileView,
        allowedRoles: ["guest", "student", "teacher", "admin"],
        isUsedLayout: true

    },
    {
        path: "/course/:id",
        element: CourseDetailView,
        allowedRoles: ["guest", "student", "teacher", "admin"],
        isUsedLayout: true

    }, {
        path: "/course/:id/watch",
        element: CourseVideo,
        allowedRoles: ["guest", "student", "teacher", "admin"],
        isUsedLayout: true

    },
    //     {
    //         path: "/activity",
    //         element: ActivityView,
    //         allowedRoles: ["guest", "student", "teacher", "admin"],
    //     },
    {
        path: "/register/complete-registeration",
        element: InstructorForm,
        allowedRoles: ["guest"],
        isUsedLayout: false
    },

];


export const MappedAuthRoute: MappedAuthRouteType[] = [
    {
        path: "/login",
        element: LoginView,
        allowedRoles: ["guest"],
        isUsedLayout: true
    },
    {
        path: "/register",
        element: SignUpView,
        allowedRoles: ["guest"],
        isUsedLayout: true
    },
    // {
    //     path: "/teachersignup",
    //     element: SignUpTeacherView,
    //     allowedRoles: ["guest"],
    // },


]

export interface MappedAuthRouteType {
    path: string;
    element: () => JSX.Element | FC<{}> | any;
    allowedRoles: string[];
    isUsedLayout: boolean;
}