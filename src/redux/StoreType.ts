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
            cart: CartItemType[];
            histories: string[];
            image: string
        };
        role: string;
        userName: string;
        isLoading: boolean
    };
    course: {
        courses: CourseType[];
        course: CourseType;
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