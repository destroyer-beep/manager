import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from "../../types/product.types";
import {productApi} from "../../api/product-api";

export interface UpdateProductSliceState {
    product: IProduct | null;
    cacheProduct: IProduct | null;
    isEdit: boolean;
}

const initialState = {
    product: null,
    cacheProduct: null,
    isEdit: false
}

const { updateProduct, deleteProduct } = productApi.endpoints;

export const updateProductSlice = createSlice({
    name: 'updateProductSlice',
    initialState,
    reducers: {
        setProduct(state: UpdateProductSliceState, { payload }: PayloadAction<IProduct>) {
            state.product = payload;
            state.cacheProduct = payload;
        },
        setTitle(state: UpdateProductSliceState, { payload }: PayloadAction<string>) {
            if(state.product) {
                state.product.title = payload;
            }
        },
        setPrice(state: UpdateProductSliceState, { payload }: PayloadAction<string>) {
            const transformPrice = Number(payload);
            if(state.product && !isNaN(transformPrice)) {
                state.product.price = transformPrice;
            }
        },
        setEdit(state: UpdateProductSliceState) {
            state.isEdit = true;
        },
        cancel(state: UpdateProductSliceState) {
            state.product = state.cacheProduct;
            state.isEdit = false;
        },
        reset(state: UpdateProductSliceState) {
            state.product = initialState.product;
            state.cacheProduct = initialState.cacheProduct;
            state.isEdit = initialState.isEdit;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(updateProduct.matchFulfilled, (state: UpdateProductSliceState, { payload }) => {
            state.product = payload;
            state.cacheProduct = payload;
            state.isEdit = false;
        });
        builder.addMatcher(deleteProduct.matchFulfilled, (state: UpdateProductSliceState) => {
            state.product = initialState.product;
            state.cacheProduct = initialState.cacheProduct;
            state.isEdit = initialState.isEdit;
        });
    },
});
