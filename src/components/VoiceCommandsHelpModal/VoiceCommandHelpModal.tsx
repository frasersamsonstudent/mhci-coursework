const VoiceCommandHelpModal = () => {
	return (
		<dialog id="help_modal" className="modal">
			<div className="modal-box">
				<h3 className="font-bold text-lg mb-4">Voice Commands</h3>
				<p className="text-sm mb-4">
					You can say the following commands outloud to interact with
					the store. To view these commands at any time, say "Show
					Help"
				</p>
				<ul className="space-y-2">
					<li className="bg-base-200">
						<span className="font-semibold">"Show Help"</span>
					</li>
					<li className="bg-base-200">
						<span className="font-semibold">
							"Add{" "}
							<em className="italic text-blue-600">item name</em>{" "}
							to basket"
						</span>
						<p className="text-sm text-gray-500 ml-4">
							Example:{" "}
							<em className="italic text-primary">
								"Add 'Pencil Holder' to basket"
							</em>
						</p>
					</li>

					<li className="bg-base-200">
						<span className="font-semibold">
							"Remove{" "}
							<em className="italic text-blue-600">item name</em>{" "}
							from basket"
						</span>
						<p className="text-sm text-gray-500 ml-4">
							Example:{" "}
							<em className="italic text-primary">
								"Remove 'Pencil Holder' from basket"
							</em>
						</p>
					</li>

					<li className="bg-base-200">
						<span className="font-semibold">"Show Basket"</span>
					</li>
					<li className="bg-base-200">
						<span className="font-semibold">"Close Basket"</span>
					</li>
					<li className="bg-base-200">
						<span className="font-semibold">"Scroll Up/Down"</span>
					</li>
					<li className="bg-base-200">
						<span className="font-semibold">"Close Help"</span>
					</li>
				</ul>
				<p className="pt-4">
					Press the <span className="font-semibold">ESC</span> key,
					click the button below, or say{" "}
					<em className="italic text-primary">Close Help</em> to close
					these commands.
				</p>
				<div className="modal-action">
					<form method="dialog">
						<button
							className="btn btn-secondary m-auto"
							id="close-help-modal"
						>
							Close
						</button>
					</form>
				</div>
			</div>
		</dialog>
	);
};

export default VoiceCommandHelpModal;
