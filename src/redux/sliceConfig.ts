import AssignmentService from '@/services/assginment.service';
import CourseService from '../services/course.service';
import AuthService from '@/services/auth.service';
import MediaService from '@/services/media.service';
import { deleteCookie } from '@/lib/utils';

export const serviceMapping: any = {
    course: new CourseService(undefined),
    assginment: new AssignmentService(undefined),
    user: new AuthService('user'),
    media: new MediaService()
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
            userCourses: [],         //loadallwithpaging
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
                type: 'loadUserCourses',
                endpoint: 'loadAllWithPaging',
                customAction: (state, action) => {
                    state.userCourses = action.payload.records.rows;
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
        name: 'user',
        initialState: {
            authUser: null,
            role: 'guest',
            isLoading: false
        },
        thunk: [
            {
                type: 'register',
                endpoint: 'register',
                customAction: (state, action) => {
                    const { token, newUser } = action.payload.data
                    document.cookie = `_at=${token}`
                    state.authUser = newUser
                    state.role = newUser.role
                },
            },
            {
                type: 'login',
                endpoint: 'login',
                customAction: (state, action) => {
                    if (action.payload.data) {
                        const { token, user } = action.payload.data
                        document.cookie = `_at=${token}`
                        state.authUser = user
                        state.role = user.role
                    }
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
                type: 'logOut',
                endpoint: 'logOut',
                customAction: (state, _) => {
                    deleteCookie('_at')
                    state.authUser = null
                    state.role = 'guest'
                },
            },
            {
                type: 'me',
                endpoint: 'me',
                customAction: (state, action) => {
                    if (action.payload.data) {
                        const { data } = action.payload
                        state.authUser = data
                        state.role = data.role
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
    {
        name: 'media',
        initialState: {
            images: {},
        },
        thunk: [
            {
                type: 'uploadImage',
                endpoint: 'uploadImage',
                customAction: (state, action) => {
                    state.images = action.payload.data;
                },
            },
        ],
    },
]

