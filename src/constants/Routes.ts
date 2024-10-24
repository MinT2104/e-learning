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
        path: "/my-course",
        element: MyCourseView,
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
    {
        path: "/course/:id",
        element: CourseDetailView,
        allowedRoles: ["guest", "student", "teacher", "admin"],
    }, {
        path: "/course/:id/watch",
        element: CourseVideo,
        allowedRoles: ["guest", "student", "teacher", "admin"],
    },
    //     {
    //         path: "/activity",
    //         element: ActivityView,
    //         allowedRoles: ["guest", "student", "teacher", "admin"],
    //     },
    {
        path: "/register/complete-registeration",
        element: InstructorForm,
        allowedRoles: ["teacher"],
        isUsedLayout: false
    },


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
    // {
    //     path: "/teachersignup",
    //     element: SignUpTeacherView,
    //     allowedRoles: ["guest"],
    // },

]