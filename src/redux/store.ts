'use client'
import { configureStore } from '@reduxjs/toolkit';
import { sliceList } from './productSlice';
import { StoreType } from './StoreType';

const store = configureStore({
    reducer: { ...sliceList }
});

(globalThis as any).$state = store.getState() as unknown as StoreType
console.log('State updated:', (globalThis as any).$state); // Debugging line

store.subscribe(() => {
    (globalThis as any).$state = store.getState() as unknown as StoreType
})


export type RootState = StoreType;
export type AppDispatch = typeof store.dispatch;

export default store;
