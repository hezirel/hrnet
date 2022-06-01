import {
	React,
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

	return (
		<input
			type="date"
			name={field}
			defaultValue={baseDate()}
			required
		>
		</input>
	);
};

Datepick.propTypes = {
	field: PropTypes.string.isRequired
};

export default Datepick;