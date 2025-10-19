import Modal from "../../ui/modal/modal";
import {useDispatch, useSelector} from "react-redux";
import s from './create-product-modal.module.scss';
import { Button } from "../../ui/button/button";
import { Input } from "../../ui/input/input";
import {createProductSelector} from "../../../store/selectors/create-product.selector";
import {createProductSlice} from "../../../store/slices/create-product.slice";
import {useCreateProductMutation} from "../../../api/product-api";
import {useMemo} from "react";

const {setCloseModal, setPrice, setCategory, setTitle, setRating} = createProductSlice.actions;

export const CreateProductModal = () => {
    const dispatch = useDispatch();
    const { product, isOpenModal } = useSelector(createProductSelector);

    const [createProduct] = useCreateProductMutation();

    const isDisabled = useMemo(() => {
        return !(product.title && product.price && product.category && product.rating.rate)
    }, [product])

    if(!isOpenModal) return null;

    const handleSetTitle = (value: string) => {
        dispatch(setTitle(value));
    }

    const handleSetPrice = (value: string) => {
        dispatch(setPrice(value));
    }

    const handleSetCategory = (value: string) => {
        dispatch(setCategory(value));
    }

    const handleSetRating = (value: string) => {
        dispatch(setRating(value));
    }

    const handleCloseModal = () => {
        dispatch(setCloseModal());
    }

    const handleCreateProduct = () => {
        createProduct({
            product: {
                title: product.title,
                price: product.price,
                category: product.category,
                rating: product.rating,
                image: product.image
            }
        })
    }

    return <Modal title={'Добавить продукт'} onClose={handleCloseModal}>
        <div className={s.updateProduct}>
            <div className={s.row}>
                <p className={s.name}>Название:</p>
                <Input value={product.title} placeholder={'Введите название'} onChange={handleSetTitle}/>
            </div>
            <img className={s.image} src={product.image} alt="image"/>
            <div className={s.row}>
                <p className={s.name}>Категория:</p>
                <Input value={product.category} onChange={handleSetCategory} placeholder={'Введите категорию'}/>
            </div>
            <div className={s.row}>
                <p className={s.name}>Стоимость:</p>
                <Input value={product.price} onChange={handleSetPrice} placeholder={'Введите цену'}/>
            </div>
            <div className={s.row}>
                <p className={s.name}>Рейтинг:</p>
                <Input value={product.rating.rate} onChange={handleSetRating} placeholder={'Введите рейтинг'}/>
            </div>
            <div className={s.controls}>
                <Button text={'Отмена'} onClick={handleCloseModal} type={'secondary'}/>
                <Button text={'Создать'} isDisabled={isDisabled} onClick={handleCreateProduct}/>
            </div>
        </div>
    </Modal>
}