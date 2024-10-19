export interface StoreType {
    user: {
        authUser: {
            _id: string;
            address: string;
            email: string;
            phoneNumber: string;
            userName: string;
            courseIds: string[];
            image: string;
            role: string;
            createdAt: string;
            updatedAt: string;
        };
        role: string,
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
    media: {
        images: { url: string }[];
    };
}


export type CourseType = {
    _id: string,
    title: string;
    link: string;
    image: string;
    oldPrice: string;
    mainPrice: string;
    instructor: Instructor;
    rating: Rating;
    videos: number;
    duration: number;
    description: string;
    totalVideos: number;
    level: string;
    chapters?: Chapter[];
    createdAt?: string;
    updatedAt?: string;
}
export interface Instructor {
    name: string;
    avatar: string;
}

// Define Rating interface
export interface Rating {
    value: number;
    max: number;
}

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
interface File {
    _id: string,
    name: string;
    url?: string; // URL không bắt buộc
}

interface Section {
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
