import { useEffect, useMemo, useState } from "react";
import StoreItemList from "../components/StoreItemList/StoreItemList";
import { StoreItemObj } from "../types/interfaces";
import Navbar from "../components/Navbar/Navbar";
import ShopLoading from "../components/ShopLoading/ShopLoading";

const Home = () => {
	const [allShopItems, setAllShopItems] = useState<StoreItemObj[]>([]);
	const [itemsInBasket, setItemsInBasket] = useState<any>([]);

	useEffect(() => {
		fetchShopItems();
	}, []);

	const fetchShopItems = () => {
		fetch("data/storeItems.json", {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((jsonResponse) => {
				setAllShopItems(jsonResponse);
			})
			.catch((error) => {
				console.error("Unable to fetch store items", error);
			});
	};

	return (
		<div className="m-auto">
			<Navbar
				itemsInBasket={itemsInBasket}
				setBasket={setItemsInBasket}
			/>
			{allShopItems.length ? (
				<StoreItemList
					allShopItems={allShopItems}
					setItems={setItemsInBasket}
				/>
			) : (
				<ShopLoading />
			)}
		</div>
	);
};

export default Home;
