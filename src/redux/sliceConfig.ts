// import AuthService from "@/services/auth.service";
// import ProductService from "@/services/product.service";
// // import { StoreType } from "./StoreType";
// import FruitService from "@/services/fruit.service";
// import CartService from "@/services/cart.service";
// import CheckoutService from "@/services/checkout.service";
import AssignmentService from '@/services/assginment.service';
import CourseService from '../services/course.service';

export const serviceMapping: any = {
    // product: new ProductService(undefined),
    // auth: new AuthService(),
    // fruit: new FruitService(undefined),
    // cart: new CartService(undefined),
    // checkout: new CheckoutService(undefined)
    course: new CourseService(undefined),
    assginment: new AssignmentService(undefined)
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
        name: 'course',
        initialState: {
            courses: [],         //loadallwithpaging
            course: {},          //getbyid
            isLoading: false,   //load xong false
            error: {},          //bao loi
            total: 0            //tong mang fruit
        },
        thunk: [
            {
                type: 'loadCourses',
                endpoint: 'loadAllWithPaging',
                customAction: (state, action) => {
                    state.courses = action.payload.records.rows;
                    state.total = action.payload.total
                },
            },
            {
                type: 'getCourse',
                endpoint: 'getById',
                customAction: (state, action) => {
                    state.course = action.payload;
                },
            },
        ],
    }, {
        name: 'assginment',
        initialState: {
            assginments: [],        //loadallwithpaging
            assginment: {},         //getbyid
            isLoading: false,       //load xong false
            error: {},              //bao loi
            total: 0                //tong mang fruit
        },
        thunk: [
            {
                type: 'loadAssginments',
                endpoint: 'loadAllWithPaging',
                customAction: (state, action) => {
                    state.assginments = action.payload.records.rows;
                    state.total = action.payload.total
                },
            },
            {
                type: 'getAssginment',
                endpoint: 'getById',
                customAction: (state, action) => {
                    state.assginment = action.payload;
                },
            },
        ],
    },
    {
        name: 'auth',
        initialState: {
            authUser: null,
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
                    // if (action.payload.data) {
                    //     const { token, roles, username } = action.payload.data
                    //     document.cookie = `_at=${token}`
                    //     document.cookie = `_un=${username}`
                    //     document.cookie = `_r=${roles}`
                    // }
                    // console.log(state)
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

