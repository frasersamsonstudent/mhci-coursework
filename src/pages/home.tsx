import { useEffect, useState } from "react";
import StoreItemList from "../components/StoreItemList/StoreItemList";
import { StoreItemObj } from "../types/interfaces";
import Navbar from "../components/Navbar/Navbar";
import ShopLoading from "../components/ShopLoading/ShopLoading";
import AppIntroduction from "../components/AppIntroduction/AppIntroduction";
import VoiceCommandHelpModal from "../components/VoiceCommandsHelpModal/VoiceCommandHelpModal";
import { toast } from "react-toastify";

const Home = () => {
	const [allShopItems, setAllShopItems] = useState<StoreItemObj[]>([]);
	const [itemsInBasket, setItemsInBasket] = useState<any>([]);
	const [showIntro, setShowIntro] = useState<boolean>(true);
	const [hasShownError, setHasShownError] = useState<boolean>(false);

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

	const alertUserPermissionDenied = (event: any) => {
		if (!hasShownError) {
			if (event?.error === "not-allowed" && !hasShownError) {
				alert("No permission granted for using microphone");
			}
			setHasShownError(true);
		}
	};

	const startListeningToSpeech = () => {
		const doesBrowserSupportSpeechRecognition =
			"SpeechRecognition" in window ||
			"webkitSpeechRecognition" in window;

		if (!doesBrowserSupportSpeechRecognition) {
			alert(
				"Your browser does not support speech recognition so the app will not be able to function correctly."
			);
			return;
		}

		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;

		const recognition = new SpeechRecognition();
		recognition.continuous = false;
		recognition.interimResults = false;

		// Handle recognition results
		recognition.onresult = (event) => {
			for (let i = event.resultIndex; i < event.results.length; i++) {
				if (event.results[i].isFinal) {
					const transcript = event.results[i][0].transcript
						.trim()
						.toLowerCase();
					handleVoiceCommand(transcript);
				}
			}
		};

		// Handle recognition errors
		recognition.onerror = (event) => {
			console.error("Speech recognition error:", event.error);
			alertUserPermissionDenied(event);
		};

		// Restart recognition after finished speaking
		recognition.onend = (result) => {
			console.log("Speech recognition ended, restarting...", result);
			recognition.start();
		};

		// Start the speech recognition
		recognition.start();

		// Cleanup on component unmount
		return () => {
			recognition.onend = null;
			recognition.stop();
		};
	};

	const showHelp = () => {
		document.getElementById("help_modal")?.showModal();
	};

	const getRegularExpForPhrase = (wordsToMatch: string | string[]) => {
		const words = Array.isArray(wordsToMatch)
			? wordsToMatch
			: [wordsToMatch];
		const pattern = words.join(".*") + " *";

		// Case insensitive matching for words
		return new RegExp(pattern, "i");
	};

	const handleAddToCartByName = (itemToAdd: string) => {
		const item = allShopItems.find(
			({ name }) => name.toLowerCase() === itemToAdd.toLowerCase()
		);

		if (item === undefined) {
			toast.error(
				`No item found matching phrase. Tried to add '${itemToAdd}' to cart.`
			);
			return;
		}

		const index = allShopItems.indexOf(item);
		// document.getElementById(`store-item-${index}`)?.scrollIntoView();
		document.getElementById(`add-to-cart-item-${index}`)?.click();
	};

	const handleRemoveFromCartByName = (itemToRemove: string) => {
		const item = allShopItems.find(
			({ name }) => name.toLowerCase() === itemToRemove.toLowerCase()
		);

		if (item === undefined) {
			toast.error(
				`No item found matching phrase. Tried to remove '${itemToRemove}' from cart.`
			);
			return;
		}

		const index = allShopItems.indexOf(item);
		// document.getElementById(`store-item-${index}`)?.scrollIntoView();
		document.getElementById(`remove-from-cart-item-${index}`)?.click();
	};

	const showBasket = () => {
		document.getElementById("openBasket")?.focus();
	};

	const hideBasket = () => {
		document.getElementById("itemList")?.focus();
	};

	const closeHelp = () => {
		document.getElementById("close-help-modal")?.click();
	};

	const handleVoiceCommand = (rawPhrase: string) => {
		const removePunctuationRegex = /[.,]/g;
		const userPhrase = rawPhrase.replace(removePunctuationRegex, "");

		const showHelpPhrases = [
			getRegularExpForPhrase("View Help"),
			getRegularExpForPhrase("Show Help"),
		];
		const closeHelpPhrases = [getRegularExpForPhrase("Close Help")];
		const viewCartPhrases = [
			getRegularExpForPhrase("View Cart"),
			getRegularExpForPhrase("Show Cart"),
			getRegularExpForPhrase("Show Basket"),
			getRegularExpForPhrase("View Basket"),
		];
		const closeBasketPhrases = [
			getRegularExpForPhrase("Close Basket"),
			getRegularExpForPhrase("Close Cart"),
		];

		const addToCartRegex = /Add (.+?) to (basket|cart)/i;
		const removeFromCartRegex = /Remove (.+?) from (basket|cart)/i;
		console.log("Trying to match phrase: " + userPhrase);

		if (showHelpPhrases.some((expression) => expression.test(userPhrase))) {
			showHelp();
		} else if (closeHelpPhrases.some((phrase) => phrase.test(userPhrase))) {
			closeHelp();
		} else if (addToCartRegex.test(userPhrase)) {
			const match = userPhrase.match(addToCartRegex);

			if (match) {
				handleAddToCartByName(match[1]);
			}
		} else if (removeFromCartRegex.test(userPhrase)) {
			const match = userPhrase.match(removeFromCartRegex);

			if (match) {
				handleRemoveFromCartByName(match[1]);
			}
		} else if (
			viewCartPhrases.some((expression) => expression.test(userPhrase))
		) {
			showBasket();
		} else if (
			closeBasketPhrases.some((expression) => expression.test(userPhrase))
		) {
			hideBasket();
		} else {
			console.log("No match found for: ", userPhrase);
		}
	};

	return (
		<div className="m-auto">
			<div className="m-auto">
				<Navbar
					itemsInBasket={itemsInBasket}
					setBasket={setItemsInBasket}
					isListening={!showIntro}
					showHelp={showHelp}
				/>
				{showIntro ? (
					<>
						<AppIntroduction
							hideIntro={() => {
								setShowIntro(false);
								startListeningToSpeech();
								showHelp();
							}}
						/>
					</>
				) : (
					<>
						{allShopItems.length ? (
							<StoreItemList
								allShopItems={allShopItems}
								setItems={setItemsInBasket}
								itemsInBasket={itemsInBasket}
							/>
						) : (
							<ShopLoading />
						)}
					</>
				)}

				<VoiceCommandHelpModal />
			</div>
		</div>
	);
};

export default Home;
