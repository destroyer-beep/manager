import { createSelector } from "@reduxjs/toolkit";
import { UpdateProductSliceState } from "../slices/update-product.slice";

interface Store {
    updateProduct: UpdateProductSliceState;
}

export const updateProductSelector = createSelector(
    (store: Store) => store.updateProduct,
    (updateProduct) => ({product: updateProduct.product, isEdit: updateProduct.isEdit}),
);