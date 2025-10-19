import { IProduct } from "../../../../../types/product.types";
import { FC } from "react";
import s from './product.module.scss';
import { updateProductSlice } from "../../../../../store/slices/update-product.slice";
import {useDispatch} from "react-redux";

interface ProductProps {
    product: IProduct;
}

const { setProduct } = updateProductSlice.actions;

export const Product: FC<ProductProps> = ({product}) => {
    const dispatch = useDispatch();

    const handleSetProduct = () => {
        dispatch(setProduct(product));
    }

    return <div className={s.product} onClick={handleSetProduct}>
        <h3 className={s.title}>{product.title}</h3>
        <img className={s.image} src={product.image} alt={product.title}/>
        <p className={s.category}>Категория: {product.category}</p>
        <div className={s.row}>
            <p className={s.price}>Цена: <span className={s.priceValue}>{product.price}</span></p>
            <p className={s.rating}>Рейтинг: <span className={s.ratingValue}>{product.rating.rate}</span></p>
        </div>
    </div>
}