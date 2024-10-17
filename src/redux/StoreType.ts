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
    title: string,
    link: string,
    image: string,
    oldPrice: string,
    mainPrice: string,
    instructor: {
        name: string,
        avatar: string,
        _id: string
    },
    rating: {
        value: number,
        max: number,
        _id: string
    },
    videos: number,
    duration: number,
    description: string,
    totalVideos: number,
    level: string
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
