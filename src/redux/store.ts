// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { sliceList } from './productSlice';
import { StoreType } from './StoreType';
import storage from 'redux-persist/lib/storage'; // Lưu trữ trong localStorage
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';

const persistConfig = {
    key: 'root',
    storage,
};

// Kết hợp các slice của bạn
const rootReducer = combineReducers({
    ...sliceList,
});

// Tạo reducer đã được persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store
const store = configureStore({
    reducer: persistedReducer,
});

// Thiết lập trạng thái toàn cục để dễ dàng truy cập
(globalThis as any).$state = store.getState() as unknown as StoreType;
console.log('State updated:', (globalThis as any).$state); // Dòng để debug

// Đăng ký lắng nghe store và cập nhật trạng thái toàn cục
store.subscribe(() => {
    (globalThis as any).$state = store.getState() as unknown as StoreType;
});

// Tạo persistor
export const persistor = persistStore(store);

// Export kiểu trạng thái
export type RootState = StoreType;
export type AppDispatch = typeof store.dispatch;

export default store;
