import DetailExamView from "@/components/application/Exam/DetailExamView";
import ClassManagement from "@/pages/admin/ClassManagement/ClassManagement";
import StudentManagement from "@/pages/admin/StudentManagement/StudentManagement";
import TeacherManagement from "@/pages/admin/TeacherManagement/TeacherManagement";
import AssignmentView from "@/pages/Assignment/AssignmentView";
import CourseDetailView from "@/pages/Course/CourseDetailView";
import CourseVideo from "@/pages/Course/CourseVideo";
import CreateExamView from "@/pages/Exam/CreateExamView";
import EditExamView from "@/pages/Exam/EditExamView";
import ExamView from "@/pages/Exam/ExamView";
import HomeView from "@/pages/Home/HomeView";
import InstructorsView from "@/pages/Instructors/InstructorsView";
import LoginView from "@/pages/Login/LoginView";
import MyCourseView from "@/pages/MyCourse/MyCourseView";
import NotificationView from "@/pages/Notification/NotificationView";
import ProfileView from "@/pages/Profile/ProfileView";
import SignUpView from "@/pages/Signup/SignUpView";
import { FC } from "react";


export const routes: MappedAuthRouteType[] = [
    {
        path: "/",
        element: HomeView,
        allowedRoles: ["guest", "student", "teacher", "admin"],
        isUsedLayout: false
    },
    // {
    //     path: "/",
    //     element: CourseView,
    //     allowedRoles: ["guest", "student", "teacher", "admin"],
    //     isUsedLayout: true
    // },
    {
        path: "/courses",
        element: MyCourseView,
        allowedRoles: ["guest", "student", "teacher", "admin"],
        isUsedLayout: true
    },
    // {
    //     path: "/tasks",
    //     element: TasksView,
    //     allowedRoles: ["guest", "student", "teacher", "admin"],
    //     isUsedLayout: true

    // },
    // {
    //     path: "/tasks/:id",
    //     element: TaskDetailView,
    //     allowedRoles: ["guest", "student", "teacher", "admin"],
    //     isUsedLayout: true
    // },
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
        path: "/courses/:id",
        element: CourseDetailView,
        allowedRoles: ["guest", "student", "teacher", "admin"],
        isUsedLayout: true

    }, {
        path: "/course/:id/watch",
        element: CourseVideo,
        allowedRoles: ["guest", "student", "teacher", "admin"],
        isUsedLayout: true
    },
    {
        path: "/class-management",
        element: ClassManagement,
        allowedRoles: ["admin"],
        isUsedLayout: true

    },
    {
        path: "/teacher-management",
        element: TeacherManagement,
        allowedRoles: ["admin"],
        isUsedLayout: true

    },
    {
        path: "/student-management",
        element: StudentManagement,
        allowedRoles: ["admin"],
        isUsedLayout: true

    },
    {
        path: "/questions",
        element: AssignmentView,
        allowedRoles: ["teacher"],
        isUsedLayout: true

    },
    {
        path: "/examinations",
        element: ExamView,
        allowedRoles: ["teacher"],
        isUsedLayout: true
    },
    {
        path: "/examinations/create",
        element: CreateExamView,
        allowedRoles: ["teacher"],
        isUsedLayout: true
    },
    {
        path: "/examinations/:id",
        element: DetailExamView,
        allowedRoles: ["teacher"],
        isUsedLayout: true
    },
    {
        path: "/examinations/edit/:id",
        element: EditExamView,
        allowedRoles: ["teacher"],
        isUsedLayout: true
    },
    {
        path: "/notifications",
        element: NotificationView,
        allowedRoles: ["teacher"],
        isUsedLayout: true
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

