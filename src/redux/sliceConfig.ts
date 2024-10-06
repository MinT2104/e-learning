// import AuthService from "@/services/auth.service";
// import ProductService from "@/services/product.service";
// // import { StoreType } from "./StoreType";
// import FruitService from "@/services/fruit.service";
// import CartService from "@/services/cart.service";
// import CheckoutService from "@/services/checkout.service";

export const serviceMapping: any = {
    // product: new ProductService(undefined),
    // auth: new AuthService(),
    // fruit: new FruitService(undefined),
    // cart: new CartService(undefined),
    // checkout: new CheckoutService(undefined)
}

interface ActionConfig {
    type: string;
    endpoint: string;
    customAction?: (state: any, action: any) => any; // Thay thế `any` bằng type chính xác nếu có thể
}

interface SliceConfig {
    name: string,
    initialState: any;
    thunk: ActionConfig[];
}

// export const sliceConfig: Record<string, SliceConfig> = {
export const sliceConfig: SliceConfig[] = [
    {
        name: 'fruit',
        initialState: {
            fruits: [],
            fruit: {},
            isLoading: false,
            error: {},
            total: 0
        },
        thunk: [
            {
                type: 'loadFruits',
                endpoint: 'loadAllWithPaging',
                customAction: (state, action) => {
                    state.fruits = action.payload.records.rows;
                    state.total = action.payload.total
                },
            },
            {
                type: 'getFruit',
                endpoint: 'getById',
                customAction: (state, action) => {
                    state.fruit = action.payload;
                },
            },
        ],
    },
    {
        name: 'cart',
        initialState: {
            carts: [],
            cart: {},
            isLoading: false,
            error: {},
        },
        thunk: [
            {
                type: 'addToCart',
                endpoint: 'addToCart',
            },
        ],
    },
    {
        name: 'checkout',
        initialState: {
            checkouts: [],
            checkout: {},
            isLoading: false,
            error: {},
        },
        thunk: [
            {
                type: 'getUserCheckout',
                endpoint: 'getUserCheckout',
                customAction: (state, action) => {
                    state.checkouts = action.payload;
                },
            },
        ],
    },
    {
        name: 'auth',
        initialState: {
            authUser: null,
            role: 'guest',
            userName: '',
            isLoading: false
        },
        thunk: [
            {
                type: 'register',
                endpoint: 'register',
                customAction: (state, action) => {
                    state.authUser = action.payload.data;
                },
            },
            {
                type: 'login',
                endpoint: 'login',
                customAction: (state, action) => {
                    if (action.payload.data) {
                        const { token, roles, username } = action.payload.data
                        document.cookie = `_at=${token}`
                        document.cookie = `_un=${username}`
                        document.cookie = `_r=${roles}`
                    }
                    console.log(state)
                },
            },
            {
                type: 'forgotPassword',
                endpoint: 'forgotPassword',
            },
            {
                type: 'resetPassword',
                endpoint: 'resetPassword',
            },
            {
                type: 'me',
                endpoint: 'me',
                customAction: (state, action) => {
                    if (action.payload.data) {
                        state.authUser = action.payload.data
                    }
                },
            },
            {
                type: 'updateUserProfile',
                endpoint: 'updateUserProfile'
            },
            {
                type: 'uploadUserImage',
                endpoint: 'uploadUserImage'
            }
        ]
    },
]

