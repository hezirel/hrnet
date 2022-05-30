import React from "react";

import {
	useDispatch,
	useSelector,
} from "react-redux";

import {
	setSuccess
} from "../../../../../redux/features/inputSlice";

import "./Modal.css";


const Modal = () => {

	const dispatch = useDispatch();
	const mod = useSelector((state) => state.input.success);

	const closeModal = (e) => {
		e.preventDefault();
		dispatch(setSuccess(false));
	};

	return (
		<div className={"modalOverlay" + (
			mod ? " show" : ""
		)}>
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