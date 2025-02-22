import { StoreItemObj } from "src/types/interfaces";

interface BasketProps {
	basketItems: StoreItemObj[];
}

const Basket = ({ basketItems }: BasketProps) => {
	const getBasketCost = (): string => {
		const cost = basketItems.reduce((acc, { cost }) => acc + cost, 0);
		return cost.toFixed(2);
	};

	return (
		<div className="flex-none">
			<div className="dropdown dropdown-end">
				<div
					tabIndex={0}
					role="button"
					className="btn btn-ghost btn-circle"
				>
					<div className="indicator">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							className="size-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
							/>
						</svg>
						{basketItems.length ? (
							<span className="badge badge-sm badge-soft badge-secondary indicator-item">
								{basketItems.length}
							</span>
						) : null}
					</div>
				</div>
				<div
					tabIndex={0}
					className="card card-compact dropdown-content bg-base-300 z-1 mt-3 w-52 shadow"
				>
					<div className="card-body">
						<span className="text-lg font-bold">
							{basketItems.length
								? `${basketItems.length} Items`
								: "Basket is Empty"}
						</span>
						<span className="text-info">
							Subtotal: £{getBasketCost()}
						</span>
						<div className="card-actions">
							<button className="btn btn-primary btn-block">
								View cart
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Basket;
