import {
	React,
} from "react";

import {
	useDbGetQuery,
} from "../../../redux/services/dbApi";

import "./Data.css";
import DataTable from "./DataTable";

function Data() {

	const {data, isError, error} = useDbGetQuery();

	return (
		<div className="dataView">
			<div className="dataTitle">
				<h1>List of current Subjects</h1>
			</div>
			<div className="searchHeader">
				<span>
					<label htmlFor="pageSize">Entries per page:</label>
					<select 
						defaultValue={10}
					>
						<option value="10">10</option>
						<option value="25">25</option>
						<option value="50">50</option>
						<option value="100">100</option>
					</select>
				</span>
				<input 
					type="text" 
					placeholder={"Search"}
					minLength={3}
				/>
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
							data && <DataTable data={data} />
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
