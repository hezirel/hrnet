import React from "react";

import "./Datepick.css";

const Datepick = () => {
	return (
		<select 
			name="Datepick"
			id="dobpick"
			placeholder="11-11-2011"
			type="date">
			<option value="11-11-2012">11-11-2012</option>
			<option value="10-09-2014">10-09-2014</option>
		</select>
	);
};

export default Datepick;