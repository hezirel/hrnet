import {
	React,
} from "react";

import {
	useDbGetQuery,
} from "../../../redux/services/dbApi";

import "./Data.css";

function Data() {

	const {data, isError, error} = useDbGetQuery();
	

	return (
		<div className="dataView">
			<div className="dataTitle">
				<h1>List of current Subjects</h1>
			</div>
			<div className="dataTable">
				<table>
					<thead>
						<tr>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Department</th>
							<th>Date of Birth</th>
							<th>Start Date</th>
							<th>State</th>
							<th>City</th>
							<th>Street</th>
							<th>Zip</th>
						</tr>
					</thead>
					<tbody>
						{
							data && data.map(subject => (
								<tr key={subject.id}>
									<td>{subject.firstName}</td>
									<td>{subject.lastName}</td>
									<td>{subject.department}</td>
									<td>{subject.dateOfBirth}</td>
									<td>{subject.startDate}</td>
									<td>{subject.state}</td>
									<td>{subject.city}</td>
									<td>{subject.street}</td>
									<td>{subject.zip}</td>
								</tr>
							))
						}
						{
							isError && (
								<tr>
									<td colSpan="10">Error: {error.message}</td>
								</tr>
							)
						}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Data;
