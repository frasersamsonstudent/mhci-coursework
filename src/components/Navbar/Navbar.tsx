import { StoreItemObj } from "src/types/interfaces";
import Basket from "../Basket/Basket";

interface NavbarProps {
	itemsInBasket: StoreItemObj[];
	setBasket: Function;
}

const Navbar = ({ itemsInBasket }: NavbarProps) => {
	return (
		<div
			className="
		bg-base-100/50 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)]
		shadow-xs
		"
		>
			<nav className="navbar shadow-sm">
				<div className="flex-1">
					<a className="btn btn-ghost text-xl">MHCI Voice Shop</a>
				</div>
				<Basket basketItems={itemsInBasket} />
			</nav>
		</div>
	);
};

export default Navbar;
