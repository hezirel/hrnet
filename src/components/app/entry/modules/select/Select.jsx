import React from "react";

import PropTypes from "prop-types";

import "./Select.css";

const Select = ({ list, label }) => {
	const rand = () => Math.floor(Math.random() * list.length);
	return (
		<select 
			name={label}
			id={label}
			defaultValue={list[rand()].name}
			type="text"
		>
			{list.map(item => (
				<option key={item.value}>{item.name}</option>
			))}
		</select>
	);
};

Select.propTypes = {
	list: PropTypes.array.isRequired,
	label: PropTypes.string.isRequired,
};

export default Select;