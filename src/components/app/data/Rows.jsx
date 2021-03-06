import React from "react";

const Rows = ({data}) => {
	return (
		data.map(subject => (
			<tr key={subject.id}>
				<td>{subject.id}</td>
				<td>{subject.firstName}</td>
				<td>{subject.lastName}</td>
				<td>{subject.department}</td>
				<td>{subject.dob}</td>
				<td>{subject.startDate}</td>
				<td>{subject.state}</td>
				<td>{subject.city}</td>
				<td>{subject.street}</td>
				<td>{subject.zip}</td>
			</tr>
		))
	);
};

export default Rows;