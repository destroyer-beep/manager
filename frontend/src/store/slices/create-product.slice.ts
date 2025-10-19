import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { IProduct } from "../../types/product.types";
import {productApi} from "../../api/product-api";

export interface CreateProductSliceState {
    product: IProduct;
    isOpenModal: boolean;
}

const initialState = {
    product: {
        title: '',
        price: 0,
        category: '',
        image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png',
        rating: {
            rate: 0
        }
    },
    isOpenModal: false
}

const { createProduct } = productApi.endpoints;

export const createProductSlice = createSlice({
    name: 'createProductSlice',
    initialState,
    reducers: {
        setTitle(state, { payload }: PayloadAction<string>) {
            state.product.title = payload;
        },
        setPrice(state, { payload }: PayloadAction<string>) {
            const transformPrice = Number(payload);
            if(!isNaN(transformPrice)) {
                state.product.price = transformPrice;
            }
        },
        setCategory(state, { payload }: PayloadAction<string>) {
            state.product.category = payload;
        },
        setRating(state, { payload }: PayloadAction<string>) {
            const transformPrice = Number(payload);
            if(!isNaN(transformPrice)) {
                state.product.rating.rate = transformPrice;
            }
        },
        setOpenModal(state) {
            state.isOpenModal = true;
        },
        setCloseModal(state) {
            state.isOpenModal = initialState.isOpenModal;
            state.product = initialState.product;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(createProduct.matchFulfilled, (state) => {
            state.isOpenModal = initialState.isOpenModal;
            state.product = initialState.product;
        });
    },
});
