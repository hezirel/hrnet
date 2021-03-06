import {
	React,
	useState,
} from "react";

import { 
	faker
} from "@faker-js/faker";

import Datepick from "./modules/datepick/Datepick";
import Select from "./modules/select/Select";
import departments from "./modules/select/departments";
import states from "./modules/select/states";

import {
	Modal,
} from "ezirel-oc-modal";

import {
	useDbInsertMutation,
} from "../../../redux/services/dbApi";

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

	const [addSubject] = useDbInsertMutation();
	const [modal, setModal] = useState(false);
	const form = document.getElementById("entryForm");

	const handleSubmit = async (event) => {
		event.preventDefault();
		await addSubject(serialForm(event.target));
		setModal(true);
	};

	return (
		<div className="entryView">
			{ modal && 
					<Modal>
						<div className="confirmModal">
							<h2>Successfully added subject to database</h2>
							<div 
								className="modalHeader"
							>
								<button 
									id="modalClose"
									onClick={() => {
										setModal(false);
										form.reset();
									}}
									autoFocus
								>
									Close this dialog
								</button>
							</div>
						</div>
					</Modal>
			}
			<div className="entryTitle">
				<h1>Add a subject to database</h1>
			</div>
			<div className="entryFormContainer">

				<form
					className="entryForm"
					onSubmit={handleSubmit}
					id="entryForm"
				>

					<div>
						<label htmlFor="first-name">First Name</label>
						<input 
							name="firstName"
							type="text"
							id="first-name"
							defaultValue={faker.name.firstName()}
							minLength={3}
							maxLength={20}
							required
						/>
					</div>

					<div>
						<label htmlFor="lastName">Last Name</label>
						<input
							type="text" 
							id="lastName"
							name="lastName"
							defaultValue={faker.name.lastName()}
							minLength={3}
							maxLength={20}
							required
						/>
					</div>

					<div>
						<label htmlFor="date-of-birth">Date of Birth</label>
						<Datepick 
							field="dob"
						/>
					</div>

					<div>
						<label htmlFor="start-date">Start Date</label>
						<Datepick 
							field="startDate"
						/>
					</div>

					<fieldset className="addressField">

						<div>
							<label htmlFor="street">Street</label>
							<input 
								id="street"
								type="text"
								placeholder="123 bis Street Name"
								name="street"
								defaultValue={faker.address.streetAddress()}
								required
							/>
						</div>

						<div>
							<label htmlFor="city">City</label>
							<input 
								id="city"
								type="text"
								placeholder="Gotham City"
								name="city"
								defaultValue={faker.address.city()}
								required
							/>
						</div>

						<div>
							<label htmlFor="state">State</label>
							<Select
								label="state"
								list={states}
							/>
						</div>

						<div>
							<label htmlFor="zip-code">Zip</label>
							<input 
								id="zip-code"
								type="number"
								placeholder="42069"
								name="zip"
								defaultValue={faker.address.zipCode("#####")}
								required
							/>
						</div>

					</fieldset>

					<div>
						<label htmlFor="department">Department</label>
						<Select 
							label="department"
							list={departments}
						/>
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
