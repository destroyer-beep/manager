import {Router} from "express";
import {productController} from "../controllers/product.controller";

const productRouter: Router = Router();

productRouter.get('/', productController.getList);
productRouter.get('/:productId', productController.getProductById);
productRouter.post('/', productController.addProduct);
productRouter.put('/:productId', productController.updateProductById);
productRouter.delete('/:productId', productController.deleteProductById);
export default productRouter;