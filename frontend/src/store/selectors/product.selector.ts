import { ProductSliceState } from "../slices/product.slice";
import { createSelector } from "@reduxjs/toolkit";

interface Store {
    product: ProductSliceState;
}

export const productSelector = createSelector(
    (store: Store) => store.product,
    (product) => ({list: product.list, loading: product.loading}),
);