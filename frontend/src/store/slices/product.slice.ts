import { createSlice } from '@reduxjs/toolkit';
import { productApi } from "../../api/product-api";
import { IProduct } from "../../types/product.types";

export interface ProductSliceState {
    list: Array<IProduct>;
    loading: boolean;
}

const initialState = {
    list: [],
    loading: false
}

const { getList, updateProduct, deleteProduct, createProduct } = productApi.endpoints;

export const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(getList.matchPending, (state: ProductSliceState) => {
            state.loading = true;
        });
        builder.addMatcher(getList.matchFulfilled, (state: ProductSliceState, { payload }) => {
            state.list = payload;
            state.loading = false;
        });
        builder.addMatcher(updateProduct.matchFulfilled, (state: ProductSliceState, { payload }) => {
            state.list = state.list.map(item => {
                if(item.id === payload.id) {
                    return payload;
                }
                return item;
            })
        });
        builder.addMatcher(deleteProduct.matchFulfilled, (state: ProductSliceState, { meta }) => {
            const params = meta.arg;
            const {id} = params.originalArgs;
            state.list = state.list.filter(item => item.id !== id);
        });
        builder.addMatcher(createProduct.matchFulfilled, (state: ProductSliceState, { payload }) => {
            state.list = [...state.list, payload];
        });
    },
});
