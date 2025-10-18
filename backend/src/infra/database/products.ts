import {IProduct} from "../../types/product.types";

export class Database {
    private data: Array<IProduct> = [
        {
            image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png',
            id: Date.now().toString(),
            title: 'test',
            category: '1',
            price: 1200,
            rating: {
                rate: 1
            }
        }
    ]

    public addProduct(product: Omit<IProduct, 'id'>): IProduct {
        const newProduct = {
            id: Date.now().toString(),
            ...product
        }

        this.data = [...this.data, newProduct]

        return newProduct;
    }

    public getList(): Array<IProduct> {
        return this.data;
    }

    public getProductById(id: string): IProduct | null {
        const product = this.data.find(item => item.id === id);

        if(product) {
            return product;
        }
        return null;
    }

    public deleteProductById(id: string): void {
        this.data = this.data.filter(item => item.id !== id);
    }

    public updateProductById(id: string, product: Partial<IProduct>): IProduct | null {
        this.data = this.data.map(item => {
            if(id === item.id) {
                return {
                    ...item,
                    ...product
                }
            }

            return item;
        });

        return this.getProductById(id);
    }
}

export const database = new Database();