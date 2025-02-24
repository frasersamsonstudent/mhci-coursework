import "./ListeningIcon.css";

const ListeningIcon = () => {
	return (
		<div className=" w-fit text-info px-4 py-2 rounded-full shadow-lg">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				className="size-6 w-6 h-6 animate-pulse"
			>
				<title>Microphone is Active</title>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
				/>
			</svg>
			{/* <span>Listening...</span> */}
		</div>
	);
};

export default ListeningIcon;
