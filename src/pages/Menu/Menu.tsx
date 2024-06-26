import { ChangeEvent, useEffect, useState } from 'react';
import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import { IProduct } from '../../interfaces/product.interface';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList';
import styles from './Menu.module.scss';

export function Menu() {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();
	const [filter, setFilter] = useState<string>();

	useEffect(() => {
		getMenu(filter);
	}, [filter]);

	const getMenu = async (name?: string) => {
		try {
			setIsLoading(true);
			const { data } = await axios.get<IProduct[]>(`${PREFIX}/products`, {
				params: { name }
			});
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
	};

	const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};

	return (
		<>
			<div className={styles['head']}>
				<Headling>Меню</Headling>
				<Search
					placeholder='Введите блюдо или состав'
					onChange={updateFilter}
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
