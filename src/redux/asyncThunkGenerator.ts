// src/redux/asyncThunkGenerator.ts
import { createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import { sliceConfig, serviceMapping } from './sliceConfig';

// Định nghĩa kiểu cho cấu hình Action
interface ActionConfig {
    type: string;
    endpoint: string;
    customAction?: (state: any, action: any) => void;
}

// Định nghĩa kiểu cho phản hồi từ dịch vụ
interface ServiceResponse {
    data: any;
    errors?: string[];
}

// Định nghĩa kiểu cho các thunks
type AsyncThunkObject = Record<string, AsyncThunk<any, any, any>>;

/**
 * Tạo các async thunks dựa trên cấu hình slice
 * @param sliceName Tên của slice cần tạo thunks
 * @returns Một đối tượng chứa các thunks được tạo
 */
const createAsyncThunks = (sliceName: string): AsyncThunkObject => {
    // Tìm cấu hình cho slice hiện tại
    const config = sliceConfig.find((data) => data.name === sliceName);
    if (!config) {
        throw new Error(`No configuration found for slice: ${sliceName}`);
    }

    const asyncThunks: AsyncThunkObject = {};

    // Tạo thunks cho mỗi action được cấu hình
    config.thunk.forEach(({ type, endpoint }: ActionConfig) => {
        asyncThunks[type] = createAsyncThunk(
            `${sliceName}/${type}`,
            async (reqObj: any, { rejectWithValue }) => {
                try {
                    const service = serviceMapping[sliceName];
                    // tạo service và gọi tới method
                    const response: ServiceResponse = await service[endpoint](reqObj);
                    if (!response.errors) {
                        return response;
                    } else {
                        return rejectWithValue(response.errors);
                    }
                } catch (error) {
                    // Xử lý lỗi
                    return rejectWithValue(error instanceof Error ? error.message : 'Unknown error occurred');
                }
            }
        );
    });

    return asyncThunks;
};

export default createAsyncThunks;
