import React from "react";

import { PropTypes } from "prop-types";

import "./Modal.css";

const Modal = ({ handleState }) => {

	const closeModal = (e) => {
		e.preventDefault();
		handleState(false);
	};

	return (
		<div className="modalOverlay show">
			<div className="confirmModal">
				<h2>Successfully added subject to database</h2>
				<div className="modalHeader">
					<button onClick={closeModal}>Close this dialog</button>
				</div>
			</div>
		</div>
	);
};

Modal.propTypes = {
	handleState: PropTypes.func.isRequired,
};

export default Modal;