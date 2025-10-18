import {database} from "../infra/database/products";
import {IProduct} from "../types/product.types";

class ProductService {
    public getList(): Array<IProduct> {
        return database.getList();
    }

    public getProductById(id: string): IProduct | null {
        return database.getProductById(id);
    }

    public addProduct(product: Omit<IProduct, 'id'>): IProduct {

        const newProduct = {
            title: product.title ?? '',
            image: product.image ?? '',
            price: product.price ?? '',
            category: product.category ?? '',
            rating: product.rating ?? {rate: 1},
        }

        return database.addProduct(newProduct);
    }

    public deleteProductById(id: string): void {
        database.deleteProductById(id);
    }

    public updateProductById(id: string, product: Partial<IProduct>): IProduct | null {
        return database.updateProductById(id, product);
    }
}

export const productService = new ProductService();