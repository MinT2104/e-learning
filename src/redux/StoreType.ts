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
    assignment: {
        assignments: AssignmentType[],
        assignment: AssignmentType;
        isLoading: boolean;
        error: string | null;
        total: number
    };
    chapter: {
        chapters: ChapterType[],
        chapter: ChapterType;
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
    question: {
        questions: QuestionType[],
        question: QuestionType;
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
        userId: string,
        _id: string
    };
    description: string;
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
export interface ChapterType {
    name: string;
    title: string;
    lessons?: Lesson[];
    _id: string;
    groupId: string;
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

export interface AssignmentType {
    _id: string,
    title: string;
    description: string;
    image: string;
    groupId: string;
    files?: File[];
}

//////////////////////////////////////////////
export interface QuestionType {
    _id?: string;
    userId?: string;
    courseData: { // Đổi từ groupData sang courseData theo schema mới
        courseId: string;
        title: string;
    };
    difficulty?: "Dễ" | "Trung bình" | "Khó";
    content?: string;
    answer?: any
};