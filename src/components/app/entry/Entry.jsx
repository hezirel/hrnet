import {
	React,
} from "react";

import "./Entry.css";

function Entry() {
	return (
		<div className="entryView">
			<div className="entryTitle">
				<h1>Add a subject to database</h1>
			</div>
			<div className="entryFormContainer">

				<form className="entryForm" onSubmit={(e) => e.preventDefault()} >

					<div>
						<label htmlFor="first-name">First Name</label>
						<input type="text" id="first-name" />
					</div>

					<div>
						<label htmlFor="last-name">Last Name</label>
						<input type="text" id="last-name" />
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

						<legend>Address</legend>

						<label htmlFor="street">Street</label>
						<input id="street" type="text" placeholder="123 bis Street Name"/>

						<label htmlFor="city">City</label>
						<input id="city" type="text" placeholder="Gotham City"/>

						<label htmlFor="state">State</label>
						<select name="state" id="state" placeholder="NY"></select>

						<label htmlFor="zip-code">Zip</label>
						<input id="zip-code" type="number" placeholder="42069"/>

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
