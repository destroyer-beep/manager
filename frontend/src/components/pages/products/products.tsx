import { useLazyGetListQuery } from "../../../api/product-api";
import { useLayoutEffect } from "react";
import s from './products.module.scss';
import { ProductList } from "../../features/product/product-list";
import { Button } from "../../ui/button/button";
import {createProductSlice} from "../../../store/slices/create-product.slice";
import {useDispatch} from "react-redux";

const {setOpenModal} = createProductSlice.actions;

export const Products = () => {
    const dispatch = useDispatch();
    const [getList] = useLazyGetListQuery();

    useLayoutEffect(() => {
        getList();
    }, [])

    const handleOpenModal = () => {
        dispatch(setOpenModal());
    }

    return <section className={s.product}>
        <div className={s.row}>
            <h2>Продукты</h2>
            <Button text={'Добавить'} onClick={handleOpenModal}/>
        </div>

        <ProductList/>
    </section>
}