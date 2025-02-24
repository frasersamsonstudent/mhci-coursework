import { useState } from "react";
import { StoreItemObj } from "src/types/interfaces";

interface StoreItemProps {
	item: StoreItemObj;
	addToCart(): void;
	index: number;
	removeFromCart: React.MouseEventHandler<HTMLButtonElement>;
	countInCart: number;
}

const StoreItem = ({
	item,
	index,
	addToCart,
	removeFromCart,
	countInCart,
}: StoreItemProps) => {
	const [showAddedEffect, setShowAddedEffect] = useState<boolean>(false);
	const { name, description, cost, imageUrl } = item;

	const onAddToCartClicked = () => {
		addToCart();

		setShowAddedEffect(true);
		setTimeout(() => {
			setShowAddedEffect(false);
		}, 1000);
	};

	const cardAddAnimationCss =
		"ring-4 ring-success transform scale-105 shadow-2xl animate-[cardAddedAnimation_1s_ease-in-out]";
	const defaultCardCss = "ring-0 transform scale-100";

	return (
		<div
			className={`card bg-base-100 p-3 shadow-md transition-all duration-1000 ease-in-out ${
				showAddedEffect ? cardAddAnimationCss : defaultCardCss
			}`}
			id={`store-item-${index}`}
		>
			<figure>
				<img
					src={imageUrl}
					alt={name}
					className="w-full h-48 object-cover"
				/>
			</figure>

			<div className="card-body p-0 sm:p-8  pt-0">
				<div className="text-lg font-semibold text-primary ">
					£{cost.toFixed(2)}
				</div>
				<h2 className="card-title text-xl text-center m-auto font-bold">
					{name}
				</h2>
				<p className="text-base-content">{description}</p>

				<div className="card-actions mt-4">
					<button
						id={`add-to-cart-item-${index}`}
						className={`btn btn-soft btn-primary flex-1 ${
							!countInCart ? "w-full" : "px-2"
						}`}
						onClick={onAddToCartClicked}
					>
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
								d="M12 4.5v15m7.5-7.5h-15"
							/>
						</svg>
						Add to cart
					</button>
					{countInCart > 0 ? (
						<button
							className="btn btn-circle"
							onClick={removeFromCart}
							id={`remove-from-cart-item-${index}`}
						>
							<svg
								style={{ width: 30, height: 30 }}
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
									d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
								/>
							</svg>
							x{countInCart}
						</button>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default StoreItem;
