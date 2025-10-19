export interface IProduct {
    image: string;
    title: string;
    id: string;
    price: number;
    category: string;
    rating: {
        rate: number;
    }
}