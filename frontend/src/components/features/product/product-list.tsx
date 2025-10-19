import { useSelector } from "react-redux";
import { productSelector } from "../../../store/selectors/product.selector";
import {Product} from "./components/product/product";
import s from './product-list.module.scss';
import {UpdateProductModal} from "../update-product-modal/update-product-modal";
import {CreateProductModal} from "../create-product-modal/create-product-modal";

export const ProductList = () => {
    const { list, loading } = useSelector(productSelector);

    if(loading) {
        return 'Загрузка';
    }

    return <div className={s.productList}>
        {list.map((product, index) => {
            return <Product key={index} product={product}/>
        })}
        <UpdateProductModal/>
        <CreateProductModal/>
    </div>
}