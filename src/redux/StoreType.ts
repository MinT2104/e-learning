
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
    fruit: {
        fruits: ProductType[];
        fruit: ProductType;
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

export type ProductType = {
    id: string;
    skuCode: string;
    name: string;
    price: number;
    currency: number;
    amount: string;
    description: string;
    status: string;
    left: number;
    count: number;
    image: string[]
    brand: string;
    createdAt: string;
    updatedAt: string;
    discountPrice: number;
    sold: number;
    category: string[]
    sale: boolean
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