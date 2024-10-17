export interface StoreType {
    product: {
        products: any[];
        product: any;
        isLoading: boolean;
        error: string | null;
    };
    auth: {
        authUser: {
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
    cart: {
        carts: any[];
        cart: any;
        isLoading: boolean;
        error: string | null;
    };
    checkout: {
        checkouts: checkoutItem[];
        checkout: checkoutItem;
        isLoading: boolean;
        error: string | null;
    }

}


export type CartItemType = {
    skucode: string;
    quantity: number;
    name: string;
    image: string;
    price: number;
    totalPrice: number
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

export type checkoutItem = {
    id: string,
    userName: string,
    name: string,
    email: string,
    address: string,
    phoneNumber: string,
    payment: string,
    totalMoney: string | null,
    cartItemList: CartItemType[]
    createdAt: string,
    updatedAt: string,
    status: string
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
