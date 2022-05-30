import React from "react";

import "./Select.css";

const Select = () => {
	return (
		<select 
			name="state"
			id="state"
			placeholder="NY"
			type="text">
			<option value="NY">NY</option>
			<option value="CA">CA</option>
		</select>
	);
};

export default Select;