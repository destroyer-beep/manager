import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slices/product.slice";
import { productApi } from "../api/product-api";
import { updateProductSlice } from "./slices/update-product.slice";
import {createProductSlice} from "./slices/create-product.slice";

export const store = configureStore({
    reducer: {
        /* slices */
        product: productSlice.reducer,
        updateProduct: updateProductSlice.reducer,
        createProduct: createProductSlice.reducer,

        /* query */
        [productApi.reducerPath]: productApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
            .concat(productApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;