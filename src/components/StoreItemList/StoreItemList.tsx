import { toast } from "react-toastify";

import { StoreItemObj } from "src/types/interfaces";
import StoreItem from "../StoreItem/StoreItem";

interface StoreItemListProps {
	allShopItems: StoreItemObj[];
	setItems: React.Dispatch<any>;
}

const StoreItemList = ({ allShopItems, setItems }: StoreItemListProps) => {
	const addItemToBasket = (index: number) => {
		const newItem = { ...allShopItems[index] };

		setItems((items: any) => [...items, newItem]);
		toast.success(`Added ${newItem.name} to basket`, { autoClose: 2500 });
	};

	return (
		<div className="grid p-3 grid-cols-2 gap-x-1 gap-y-4 sm:gap-x-6 sm:gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 overflow-hidden">
			{allShopItems.map((item, index) => (
				<StoreItem
					key={index}
					item={item}
					index={index}
					addToCart={() => addItemToBasket(index)}
				/>
			))}
		</div>
	);
};

export default StoreItemList;
