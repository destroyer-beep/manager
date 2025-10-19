import {Request, Response} from 'express';
import {productService} from "../services/product.service";
import {pick} from "../utils/helpers/pick.helpers";

class ProductController {
    public getList(req: Request, res: Response) {
        try {
            // Костыль чтобы не ругался ts, так как вариант реализации сервера очень схематичный)))
            if(!req) return;

            const list = productService.getList();
            res.status(200).send(list);
        } catch (e) {
            res.status(500).send({message: e.message});
        }
    }

    public getProductById(req: Request, res: Response) {
        try {
            const {productId} = req.params;
            const product = productService.getProductById(productId);

            if(!product) {
                // По идее лучше обработать в сервисе
                res.status(404).send({message: 'Продукт не найден'});
                return;
            }

            res.status(200).send(product);

        } catch (e) {
            res.status(500).send({message: e.message});
        }
    }

    public addProduct(req: Request, res: Response) {
        try {
            const {product} = req.body;
            const validationProduct = pick(product, ['title', 'image', 'price', 'category', 'rating']);

            const newProduct = productService.addProduct(validationProduct);

            res.status(200).send(newProduct);

        } catch (e) {
            res.status(500).send({message: e.message});
        }
    }

    public deleteProductById(req: Request, res: Response) {
        try {
            const {productId} = req.params;

            productService.deleteProductById(productId);

            res.status(200).end();

        } catch (e) {
            res.status(500).send({message: e.message});
        }
    }

    public updateProductById(req: Request, res: Response) {
        try {
            const {productId} = req.params;
            const {product} = req.body;

            const oldProduct = productService.getProductById(productId);

            if(!oldProduct) {
                // По идее лучше обработать в сервисе
                res.status(404).send({message: 'Продукт не найден'});
                return;
            }

            const {image, rating, category} = oldProduct;

            const validationProduct = pick(product, ['title', 'price']);

            const newProduct = productService.updateProductById(productId, {...validationProduct, image, category, rating});

            res.status(200).send(newProduct);

        } catch (e) {
            res.status(500).send({message: e.message});
        }
    }
}

export const productController = new ProductController();