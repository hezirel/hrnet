import {
	React,
} from "react";

import {
	useDispatch,
} from "react-redux";

import {
	addEntry,
} from "../../../redux/features/inputSlice";

import "./Entry.css";

const serialForm = (form) => {
	const formData = new FormData(form);
	const serialized = {};
	for (const [key, value] of formData.entries()) {
		serialized[key] = value;
	}
	return serialized;
};

function Entry() {

	const dispatch = useDispatch();

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(addEntry(serialForm(event.target)));
	};

	return (
		<div className="entryView">
			<div className="entryTitle">
				<h1>Add a subject to database</h1>
			</div>
			<div className="entryFormContainer">

				<form className="entryForm" onSubmit={handleSubmit} >

					<div>
						<label htmlFor="first-name">First Name</label>
						<input 
							name="firstName"
							type="text"
							id="first-name"
							placeholder="Mario"
							defaultValue={"mario"}
							minLength={3}
							maxLength={20}
						/>
					</div>

					<div>
						<label htmlFor="lastName">Last Name</label>
						<input type="text" id="lastName" />
					</div>

					<div>
						<label htmlFor="date-of-birth">Date of Birth</label>
						<input id="date-of-birth" type="text"/>
					</div>

					<div>
						<label htmlFor="start-date">Start Date</label>
						<input id="start-date" type="text" />
					</div>

					<fieldset className="addressField">

						<div>
							<label htmlFor="street">Street</label>
							<input id="street" type="text" placeholder="123 bis Street Name"/>
						</div>

						<div>
							<label htmlFor="city">City</label>
							<input id="city" type="text" placeholder="Gotham City"/>
						</div>

						<div>
							<label htmlFor="state">State</label>
							<select name="state" id="state" placeholder="NY"></select>
						</div>

						<div>
							<label htmlFor="zip-code">Zip</label>
							<input id="zip-code" type="number" placeholder="42069"/>
						</div>

					</fieldset>

					<div>
						<label htmlFor="department">Department</label>
						<select name="department" id="department">
							<option>Sales</option>
							<option>Marketing</option>
							<option>Engineering</option>
							<option>Human Resources</option>
							<option>Legal</option>
						</select>
					</div>
					<div>
						<button type="submit">Save</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Entry;
