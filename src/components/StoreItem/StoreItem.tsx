import { useState } from "react";
import { StoreItemObj } from "src/types/interfaces";

interface StoreItemProps {
	item: StoreItemObj;
	addToCart(): void;
}

const StoreItem = ({ item, addToCart }: StoreItemProps) => {
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
		>
			<figure>
				<img
					src={imageUrl}
					alt={name}
					className="w-full h-48 object-cover"
				/>
			</figure>

			<div className="card-body pt-0">
				<div className="text-lg font-semibold text-primary ">
					£{cost.toFixed(2)}
				</div>
				<h2 className="card-title text-xl text-center m-auto font-bold">
					{name}
				</h2>
				<p className="text-base-content">{description}</p>

				<div className="card-actions mt-4">
					<button
						className="btn btn-soft btn-primary w-full"
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
				</div>
			</div>
		</div>
	);
};

export default StoreItem;
