import Modal from "../../ui/modal/modal";
import {useDispatch, useSelector} from "react-redux";
import { updateProductSelector } from "../../../store/selectors/update-product.selector";
import { updateProductSlice } from "../../../store/slices/update-product.slice";
import s from './update-product-modal.module.scss';
import { Button } from "../../ui/button/button";
import { Input } from "../../ui/input/input";
import {useDeleteProductMutation, useUpdateProductMutation} from "../../../api/product-api";
import {useMemo} from "react";

const { reset, setTitle, setPrice, setEdit, cancel } = updateProductSlice.actions;

export const UpdateProductModal = () => {
    const dispatch = useDispatch();
    const { product, isEdit } = useSelector(updateProductSelector);
    const [updateProduct]= useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    const isDisabled = useMemo(() => {
        return !(product && product.price && product.title);
    }, [product])

    if(!product) return;

    const handleCloseModal = () => {
        dispatch(reset());
    }

    const handleSetPrice = (value: string) => {
        dispatch(setPrice(value));
    }

    const handleSetTitle = (value: string) => {
        dispatch(setTitle(value));
    }

    const handleSetEdit = () => {
        dispatch(setEdit());
    }

    const handleCancel = () => {
        dispatch(cancel());
    }

    const handleSave = () => {
        updateProduct({
            id: product.id,
            product: {
                price: product.price,
                title: product.title
            }
        })
    }

    const handleDelete = () => {
        deleteProduct({
            id: product.id
        })
    }

    return <Modal title={'Редактировать продукт'} onClose={handleCloseModal}>
        <div className={s.updateProduct}>
            <div className={s.row}>
                <p className={s.name}>Название:</p>
                {
                    isEdit ?
                    <Input value={product.title} placeholder={'Введите название'} onChange={handleSetTitle}/> :
                    <h4 className={s.value}>
                        {product.title}
                    </h4>
                }
            </div>
            <img className={s.image} src={product.image} alt="image"/>
            <div className={s.row}>
                <p className={s.name}>Категория:</p>
                <p className={s.value}>{product.category}</p>
            </div>
            <div className={s.row}>
                <p className={s.name}>Стоимость:</p>
                {
                    isEdit ?
                        <Input value={product.price} onChange={handleSetPrice} placeholder={'Введите цену'}/> :
                        <p className={s.value}>{product.price}</p>
                }
            </div>
            <div className={s.row}>
                <p className={s.name}>Рейтинг:</p>
                <p className={s.value}>{product.rating.rate}</p>
            </div>
            <div className={s.controls}>
                {isEdit ? <>
                    <Button text={'Отмена'} onClick={handleCancel} type={'secondary'}/>
                    <Button text={'Сохранить'} isDisabled={isDisabled} onClick={handleSave}/>
                </> :
                <>
                    <Button text={'Удалить'} onClick={handleDelete} type={'secondary'}/>
                    <Button text={'Редактировать'} onClick={handleSetEdit}/>
                </>}
            </div>
        </div>
    </Modal>
}