import { StoreItemObj } from "src/types/interfaces";
import Basket from "../Basket/Basket";
import HelpIcon from "../HelpIcon/HelpIcon";
import ListeningIcon from "../ListeningIcon/ListeningIcon";

interface NavbarProps {
	itemsInBasket: StoreItemObj[];
	setBasket: Function;
	isListening: boolean;
	showHelp: React.MouseEventHandler<HTMLButtonElement>;
}

const Navbar = ({ itemsInBasket, isListening, showHelp }: NavbarProps) => {
	return (
		<div
			className="
		bg-base-100/50 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)]
		shadow-xs
		"
		>
			<nav className="navbar shadow-sm">
				<div className="flex-1">
					<a className="btn btn-ghost text-xl">
						MHCI Voice Shop {isListening ? <ListeningIcon /> : null}
					</a>
				</div>

				<HelpIcon onClick={showHelp} />
				<Basket basketItems={itemsInBasket} />
			</nav>
		</div>
	);
};

export default Navbar;
