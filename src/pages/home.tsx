// @ts-nocheck
// TODO remove no check once webspeech works

import { useEffect, useMemo, useState } from "react";
import StoreItemList from "../components/StoreItemList/StoreItemList";
import { StoreItemObj } from "../types/interfaces";
import Navbar from "../components/Navbar/Navbar";
import ShopLoading from "../components/ShopLoading/ShopLoading";
import AppIntroduction from "../components/AppIntroduction/AppIntroduction";

const Home = () => {
	const [allShopItems, setAllShopItems] = useState<StoreItemObj[]>([]);
	const [itemsInBasket, setItemsInBasket] = useState<any>([]);
	const [isListening, setIsListening] = useState<boolean>(false);
	const [showIntro, setShowIntro] = useState<boolean>(true);

	useEffect(() => {
		fetchShopItems();
	}, []);

	useEffect(() => {});

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

	const startListeningToSpeech = () => {
		if (isListening) {
			console.error("Already listening");
			return;
		}

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
					console.log("Transcript after speech over:", transcript);
				}
			}
		};

		// Handle recognition errors
		recognition.onerror = (event) => {
			console.error("Speech recognition error:", event.error);
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

	if (showIntro) {
		return (
			<div className="m-auto">
				<Navbar
					itemsInBasket={itemsInBasket}
					setBasket={setItemsInBasket}
				/>
				<AppIntroduction
					hideIntro={() => {
						setShowIntro(false);
						startListeningToSpeech();
					}}
				/>
			</div>
		);
	}

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
