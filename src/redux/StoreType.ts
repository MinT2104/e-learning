export interface StoreType {
    auth: {
        authUser: UserType
        isLoading: boolean;
        isLoggedIn: boolean
    };
    user: {
        users: UserType[]
        user: UserType
        total: number,
        error: string | null;
        isLoading: boolean
    };
    course: {
        courses: CourseType[];
        course: CourseType;
        isLoading: boolean;
        error: string | null;
        total: number
    };
    assginment: {
        assginments: AssignmentType[],
        assginment: AssignmentType;
        isLoading: boolean;
        error: string | null;
        total: number
    };
    group: {
        groups: GroupType[],
        group: GroupType;
        isLoading: boolean;
        error: string | null;
        total: number;
    };
    media: {
        images: { url: string }[];
    };
}

export type GroupType = {
    title: string;
    courseData: CourseType
    teacherData?: {
        email: string;
        image: string;
        userName: string;
    };
    description: string;
    chapters: Chapter[];
    createdAt: Date;
    updatedAt: Date;
    _id: string

}

export type UserType =
    {
        _id?: string;
        address: string;
        email: string;
        phoneNumber: string;
        userName: string;
        courseIds?: string[];
        image?: string;
        role: string;
        createdAt?: string;
        updatedAt?: string;
        status?: string
    };


export type CourseType = {
    _id: string,
    title: string;
    courseId: string;
    groupIds: string[];
    description: string;
    createdAt?: string;
    updatedAt?: string;
}


// Define Rating interface


// Define Lesson interface
export interface Lesson {
    duration: string;
    title: string;
    url: string;
    _id: string;
}

// Define Chapter interface
export interface Chapter {
    name: string;
    title?: string;
    lessons?: Lesson[];
    _id: string;
}


// Assignment
export interface File {
    _id: string,
    name: string;
    url?: string; // URL không bắt buộc
}

export interface Section {
    _id: string,
    name: string;
    files?: File[]; // Mảng file, không bắt buộc
}

interface Author {
    name: string;
    image: string;
    authorId: string;
}

export interface AssignmentType {
    _id: string,
    courseId: string;
    author: Author;
    title: string;
    description: string;
    image: string;
    sections?: Section[]; // Mảng sections, không bắt buộc
}