import { useEffect, useState } from 'react';
import Headling from '../../components/Headling/Headling';
import CartItem from '../../components/CartItem/CartItem';
import Button from '../../components/Button/Button';
import { RootState, AppDispatch } from '../../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IProduct } from '../../interfaces/product.interface';
import { PREFIX } from '../../helpers/API';
import axios from 'axios';
import { cartActions } from '../../store/cart.slice';
import styles from './Cart.module.scss';

const DELIVERY_FEE = 169;

export function Cart() {
    const [cartProducts, setCardProducts] = useState<IProduct[]>([]);
    const items = useSelector((s: RootState) => s.cart.items);
    const jwt = useSelector((s: RootState) => s.user.jwt);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const total = items
        .map((i) => {
            const product = cartProducts.find((p) => p.id === i.id);
            if (!product) {
                return 0;
            }
            return i.count * product.price;
        })
        .reduce((acc, i) => (acc += i), 0);

    const getItem = async (id: number) => {
        const { data } = await axios.get<IProduct>(`${PREFIX}/products/${id}`);
        return data;
    };

    const loadAllItems = async () => {
        const res = await Promise.all(items.map((i) => getItem(i.id)));
        setCardProducts(res);
    };

    const checkout = async () => {
        await axios.post(
            `${PREFIX}/order`,
            {
                products: items,
            },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );
        dispatch(cartActions.clean());
        navigate('/success');
    };

    useEffect(() => {
        loadAllItems();
    }, [items]);

    return (
        <>
            <Headling className={styles['headling']}>Корзина</Headling>
            {items.map((i) => {
                const product = cartProducts.find((p) => p.id === i.id);
                if (!product) {
                    return;
                }
                return (
                    <CartItem key={product.id} count={i.count} {...product} />
                );
            })}
            <div className={styles['line']}>
                <div className={styles['text']}>Итог</div>
                <div className={styles['price']}>
                    {total}&nbsp;<span>₽</span>
                </div>
            </div>
            <hr className={styles['hr']} />
            <div className={styles['line']}>
                <div className={styles['text']}>Доставка</div>
                <div className={styles['price']}>
                    {DELIVERY_FEE}&nbsp;<span>₽</span>
                </div>
            </div>
            <hr className={styles['hr']} />
            <div className={styles['line']}>
                <div className={styles['text']}>
                    Итог{' '}
                    <span className={styles['total-count']}>
                        ({items.length})
                    </span>
                </div>
                <div className={styles['price']}>
                    {total + DELIVERY_FEE}&nbsp;<span>₽</span>
                </div>
            </div>
            <div className={styles['checkout']}>
                <Button appearence='big' onClick={checkout}>
                    оформить
                </Button>
            </div>
        </>
    );
}
