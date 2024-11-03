// src/redux/asyncThunkGenerator.ts
import { createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import { sliceConfig, serviceMapping } from './sliceConfig';

interface ActionConfig {
    type: string;
    endpoint: string;
    customAction?: (state: any, action: any) => void;
}

interface ServiceResponse {
    data: any;
    errors?: string[];
}

type AsyncThunkObject = Record<string, AsyncThunk<any, any, any>>;

const createAsyncThunks = (sliceName: string): AsyncThunkObject => {
    // Tìm cấu hình cho slice hiện tại
    const config = sliceConfig.find((data) => data.name === sliceName);
    if (!config) {
        throw new Error(`No configuration found for slice: ${sliceName}`);
    }

    const asyncThunks: AsyncThunkObject = {};

    config.thunk.forEach(({ type, endpoint }: ActionConfig) => {
        asyncThunks[type] = createAsyncThunk(
            `${sliceName}/${type}`,
            async (reqObj: any, { rejectWithValue }) => {
                try {
                    const service = serviceMapping[sliceName];

                    const response: ServiceResponse = await service[endpoint](reqObj);
                    if (!response.errors) {
                        return response;
                    } else {
                        return rejectWithValue(response.errors);
                    }
                } catch (error) {
                    return rejectWithValue(error instanceof Error ? error.message : 'Unknown error occurred');
                }
            }
        );
    });

    return asyncThunks;
};

export default createAsyncThunks;
