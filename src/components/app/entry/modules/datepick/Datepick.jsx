import {
	React,
	useState,
} from "react";

import { 
	faker
} from "@faker-js/faker";

import PropTypes from "prop-types";

import "./Datepick.css";

const Datepick = ({ field = "dob"}) => {

	const baseDate = (start = (
		field === "dob" ? 
			faker.date.birthdate : faker.date.future
	)) => start().toISOString().substring(0, 10);
	const [startDate, setStartDate] = useState(baseDate);
	startDate ? true : false;

	return (
		<input
			type="date"
			name={field}
			defaultValue={baseDate()}
			onChange={(e) => setStartDate(new Date(e.target.value))}
			required
		>
		</input>
	);
};

Datepick.propTypes = {
	field: PropTypes.string.isRequired
};

export default Datepick;