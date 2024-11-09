import AssignmentService from '@/services/assginment.service';
import CourseService from '../services/course.service';
import AuthService from '@/services/auth.service';
import MediaService from '@/services/media.service';
import { deleteCookie } from '@/lib/utils';
import GroupService from '@/services/group.service';
import UserService from '@/services/user.service';

export const serviceMapping: any = {
    course: new CourseService('course'),
    assginment: new AssignmentService('assignment'),
    auth: new AuthService('auth'),
    media: new MediaService('media'),
    group: new GroupService('group'),
    user: new UserService('user')
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
            isLoading: false,    //load xong false
            error: {},           //bao loi
            total: 0             //tong mang fruit
        },
        thunk: [
            {
                type: 'loadCourses',
                endpoint: 'loadAllWithPaging',
                customAction: (state, action) => {
                    state.courses = action.payload.records.rows;
                    console.log(action.payload)
                    state.total = action.payload.records.total
                },
            },
            {
                type: 'getCourse',
                endpoint: 'getById',
                customAction: (state, action) => {
                    state.course = action.payload;
                },
            },
            {
                type: 'updateCourse',
                endpoint: 'update',
                customAction: (state, action) => {
                    state.course = action.payload;
                },
            },
            {
                type: 'createCourse',
                endpoint: 'save',
                customAction: (state, action) => {
                    state.course = action.payload;
                },
            },
        ],
    },
    {
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
        name: 'group',
        initialState: {
            groups: [],        //loadallwithpaging
            group: {},         //getbyid
            isLoading: false,       //load xong false
            error: {},              //bao loi
            total: 0                //tong mang fruit
        },
        thunk: [
            {
                type: 'loadGroups',
                endpoint: 'loadAllWithPaging',
                customAction: (state, action) => {
                    state.groups = action.payload.records.rows;
                    state.total = action.payload.total
                },
            },
            {
                type: 'getGroup',
                endpoint: 'getById',
                customAction: (state, action) => {
                    state.group = action.payload;
                },
            },
            {
                type: 'createGroup',
                endpoint: 'save',
                customAction: (state, action) => {
                    state.group = action.payload;
                },
            },
            {
                type: 'updateGroup',
                endpoint: 'update',
                customAction: (state, action) => {
                    state.group = action.payload;
                },
            },
            {
                type: 'deleteGroup',
                endpoint: 'remove',
            },
        ],
    },
    {
        name: 'auth',
        initialState: {
            authUser: null,
            isLoading: false,
            isLoggedIn: false
        },
        thunk: [
            {
                type: 'register',
                endpoint: 'register',
                customAction: (state, action) => {
                    const { token, newUser } = action.payload.data
                    document.cookie = `_at=${token}`
                    state.authUser = newUser
                    state.isLoggedIn = true
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
                        state.isLoggedIn = true
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
                    state.isLoggedIn = false
                },
            },
            {
                type: 'me',
                endpoint: 'me',
                customAction: (state, action) => {
                    if (action.payload.data) {
                        const { data } = action.payload
                        state.authUser = data
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
        name: 'user',
        initialState: {
            users: null,
            user: null,
            isLoading: false,
            error: null,
            total: 0
        },
        thunk: [
            {
                type: 'loadUsers',
                endpoint: 'loadAllWithPaging',
                customAction: (state, action) => {
                    state.users = action.payload.records.rows;
                    state.total = action.payload.records.total
                },
            },
            {
                type: 'createUsers',
                endpoint: 'save',
                customAction: (state, action) => {
                    state.user = action.payload.records;
                },
            },
            {
                type: 'updateUser',
                endpoint: 'update',
                customAction: (state, action) => {
                    state.user = action.payload.records;
                },
            },
            {
                type: 'signCourse',
                endpoint: 'signCourse'
            },
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

