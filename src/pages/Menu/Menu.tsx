import { ChangeEvent, useEffect, useState } from 'react';
import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import { IProduct } from '../../interfaces/product.interface';
import styles from './Menu.module.scss';
import axios, { Axios, AxiosError, AxiosResponse } from 'axios';
import { MenuList } from './MenuList/MenuList';
import ProductCard from '../../components/ProductCard/ProductCard';

export function Menu() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    // const [filter, setFilter] = useState<string>();

    // useEffect(() => {
    //     getMenu(filter);
    // }, [filter]);

    useEffect(() => {
        getMenu();
    }, []);

    const getMenu = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get<IProduct[]>(`${PREFIX}/products`);
            if (data) {
                setProducts(data);
            }
        } catch (e) {
            console.error(e);
            if (e instanceof AxiosError) {
                setError(e.message);
            }
            return;
        } finally {
            setIsLoading(false);
        }

        // try {
        // 	const res = await fetch(`${PREFIX}/products`);
        // 	if (!res.ok) {
        // 		return;
        // 	}
        // 	const data = (await res.json()) as Product[];
        // 	console.log('data', data);
        // 	setProducts(data);
        // } catch (error) {
        // 	console.error(error);
        // 	return;
        // }
    };

    // const getMenu = async (name?: string) => {
    // 	try {
    // 		setIsLoading(true);
    // 		const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
    // 			params: {
    // 				name
    // 			}
    // 		});
    // 		setProducts(data);
    // 		setIsLoading(false);
    // 	} catch (e) {
    // 		console.error(e);
    // 		if (e instanceof AxiosError) {
    // 			setError(e.message);
    // 		}
    // 		setIsLoading(false);
    // 		return;
    // 	}
    // };

    // const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
    // 	setFilter(e.target.value);
    // };

    return (
        <>
            <div className={styles['head']}>
                <Headling>Меню</Headling>
                <Search
                    placeholder='Введите блюдо или состав'
                    // onChange={updateFilter}
                />
            </div>
            <div>
                {error && <>{error}</>}
                {!isLoading && products.length > 0 && (
                    <MenuList products={products} />
                )}
                {isLoading && <>Загружаем продукты...</>}
                {!isLoading && products.length === 0 && (
                    <>Не найдено блюд по запросу</>
                )}
            </div>
        </>
    );
}

export default Menu;
