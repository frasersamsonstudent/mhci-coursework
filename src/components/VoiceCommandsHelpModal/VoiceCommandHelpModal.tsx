const VoiceCommandHelpModal = () => {
	return (
		<dialog id="help_modal" className="modal">
			<div className="modal-box">
				<h3 className="font-bold text-lg mb-4">Voice Commands</h3>
				<p className="text-sm mb-4">
					Say the following commands aloud to interact with the
					application:
				</p>
				<ul className="space-y-2">
					<li>
						<span className="font-semibold">"Show Help"</span>
					</li>
					<span className="font-semibold">
						"Add <em className="italic text-blue-600">item name</em>{" "}
						to basket"
					</span>
					<p className="text-sm text-gray-500 ml-4">
						Example:{" "}
						<em className="italic text-primary">
							"Add 'Pencil Holder' to basket"
						</em>
					</p>
					<li>
						<span className="font-semibold">"Show Basket"</span>
					</li>
					<li>
						<span className="font-semibold">"Close Help"</span>
					</li>
				</ul>
				<p className="pt-4 text-secondary-content">
					Press the <span className="font-semibold">ESC</span> key,
					click the button below, or say{" "}
					<em className="italic text-primary">Close Help</em> to
					close.
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
