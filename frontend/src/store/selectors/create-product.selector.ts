import { createSelector } from "@reduxjs/toolkit";
import {CreateProductSliceState} from "../slices/create-product.slice";

interface Store {
    createProduct: CreateProductSliceState;
}

export const createProductSelector = createSelector(
    (store: Store) => store.createProduct,
    (createProduct) => ({product: createProduct.product, isOpenModal: createProduct.isOpenModal}),
);