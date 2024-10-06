'use client';
import { createSlice, PayloadAction, AsyncThunk } from '@reduxjs/toolkit';
import generateAsyncThunks from './asyncThunkGenerator';
import { sliceConfig } from './sliceConfig';

// Định nghĩa kiểu cho trạng thái của slice
interface SliceState {
    isLoading: boolean;
    error: string | null;
}

// Định nghĩa kiểu cho các thunks bất đồng bộ
interface AsyncThunkMap {
    [key: string]: AsyncThunk<any, any, any>;
}

// Định nghĩa kiểu cho cấu hình slice
interface SliceConfigType {
    name: string;
    initialState: SliceState;
    thunk: {
        type: string;
        endpoint: string;
        customAction?: (state: SliceState, action: PayloadAction<any>) => void;
    }[];
}

// Tạo đối tượng lưu trữ thunks và slices
export const asyncThunks: Record<string, AsyncThunkMap> = {};
export const sliceList: Record<string, any> = {};

// Tạo các slice dựa trên cấu hình
sliceConfig.forEach((data: SliceConfigType) => {
    const { name, initialState } = data;

    if (!name) {
        throw new Error('Slice configuration must include a name.');
    }

    // Tạo các thunks cho slice
    asyncThunks[name] = generateAsyncThunks(name);

    // Tạo slice
    sliceList[name] = createSlice({
        name,
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            Object.entries(asyncThunks[name]).forEach(([type, thunk]) => {
                builder
                    .addCase(thunk.pending, (state) => {
                        state.isLoading = true;
                    })
                    .addCase(thunk.fulfilled, (state, action) => {
                        state.isLoading = false;
                        const existConfig = data.thunk.find((config) => config.type === type);
                        if (existConfig && existConfig.customAction) {
                            existConfig.customAction(state, action);
                        }
                        state.error = null;
                    })
                    .addCase(thunk.rejected, (state, action) => {
                        state.isLoading = false;
                        state.error = action.payload as string; // Đảm bảo kiểu chính xác
                    });
            });
        },
    }).reducer;
});

// Cập nhật global action
Object.keys(asyncThunks).forEach((key) => {
    (globalThis as any).$action = {
        ...(globalThis as any)?.$action,
        ...asyncThunks[key]
    };
})

