import { MouseEventHandler } from "react";

interface AppIntroductionProps {
	hideIntro: MouseEventHandler<HTMLButtonElement>;
}

const AppIntroduction = ({ hideIntro }: AppIntroductionProps) => {
	return (
		<div className="prose m-auto mt-5 px-3">
			<h2>App Explanation and Introduction</h2>
			<p>
				This application demonstrates how speech can be used as an input
				method. It features a simple web store interface, with example
				products which can be used to test interacting with the site.
			</p>
			<p>
				To use this app as intended, you will need to allow access to
				your microphone. The application will continually use your
				microphone to receive voice input and use this to complete
				actions on the site (for example, adding an item to your cart).
				The application will stop using the microphone once the page is
				closed.
			</p>

			<p>
				<em>
					If you agree to the use of your microphone, you can continue
					to the store page by pressing the button below:
				</em>
			</p>

			<button className="btn btn-success btn-soft" onClick={hideIntro}>
				Start Exploring Store with Voice
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
						d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
					/>
				</svg>
			</button>
		</div>
	);
};

export default AppIntroduction;
