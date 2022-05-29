import {
	React,
} from "react";

import {
	useDbInsertMutation,
} from "../../../redux/services/dbApi";

import { 
	faker
} from "@faker-js/faker";

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

	const [addSubject, res] = useDbInsertMutation();

	const handleSubmit = async (event) => {
		event.preventDefault();
		await addSubject(serialForm(event.target));
		event.target.reset();
		console.log(res);
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
						<input 
							id="date-of-birth" 
							type="text"
							name="DOB"
							defaultValue={faker.date.past().toISOString().substring(0, 10)}
							required
						/>
					</div>

					<div>
						<label htmlFor="start-date">Start Date</label>
						<input 
							id="start-date"
							type="text"
							name="startDate"
							defaultValue={faker.date.past().toISOString().substring(0, 10)}
							required
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
							<select name="state" id="state" placeholder="NY"></select>
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
						<select 
							name="department" 
							id="department"
							defaultValue={faker.helpers.arrayElement(["Engineering", "Human Resources", "Sales", "Marketing", "Legal"])}
						>
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
