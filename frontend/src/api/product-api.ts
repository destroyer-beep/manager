import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBase } from "./api.helpers";
import {IProduct} from "../types/product.types";

interface UpdateProductRequest {
    product: {
        title: string;
        price: number;
    }
    id: string;
}

interface DeleteProductRequest {
    id: string;
}

interface CreateProductRequest {
    product: Omit<IProduct, 'id'>;
}

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: customFetchBase,
    endpoints: (builder) => ({
        getList: builder.query<Array<IProduct>, void>({
            query: () => ({
                url: 'products',
                method: 'GET'
            }),
        }),
        updateProduct: builder.mutation<IProduct, UpdateProductRequest>({
            query: ({id, ...data}) => ({
                url: `products/${id}`,
                method: 'PUT',
                body: data
            }),
        }),
        deleteProduct: builder.mutation<void, DeleteProductRequest>({
            query: ({id}) => ({
                url: `products/${id}`,
                method: 'DELETE'
            }),
        }),
        createProduct: builder.mutation<IProduct, CreateProductRequest>({
            query: ({product}) => ({
                url: `products`,
                method: 'POST',
                body: {product}
            }),
        }),
    }),
});

export const {
    useLazyGetListQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useCreateProductMutation
} = productApi;