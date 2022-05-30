import React from "react";

import "./Modal.css";


const Modal = () => {

	const closeModal = (e) => {
		e.preventDefault();
		document.querySelector(".modalOverlay").classList.remove("show");
	};

	return (
		<div className="modalOverlay">
			<div className="confirmModal">
				<h2>Successfully added subject to database</h2>
				<div className="modalHeader">
					<button onClick={closeModal}>Close this dialog</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;