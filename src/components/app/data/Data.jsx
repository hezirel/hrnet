import {
	React,
	useState,
} from "react";

import {
	useDbGetQuery,
} from "../../../redux/services/dbApi";

import "./Data.css";
import DataTable from "./DataTable";

function Data() {

	const {data, isError, error} = useDbGetQuery();
	const [activePage, setActivePage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [filter, setFilter] = useState("");

	return (
		<div className="dataView">
			<div className="dataTitle">
				<h1>List of current Subjects</h1>
			</div>
			<div className="searchHeader">
				<span>
					<label htmlFor="pageSize">Entries per page:</label>
					<select 
						defaultValue={itemsPerPage}
						onChange={(e) => setItemsPerPage(e.target.value)}
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
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
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
							data && <DataTable data={
								filter.length > 2 ?
									data.filter(subject => 
										Object.entries(subject).some(entry => 
											typeof(entry[1]) === "string" && 
												entry[1].toLowerCase().includes(filter.toLowerCase())))
									: 
									data } />
						}
						{isError && 
								(
									<tr>
										<td colSpan="10">Error: {error.message}</td>
									</tr>
								)
						}
					</tbody>
				</table>
			</div>
			<div className="tableFooter">
				<span>
					<label htmlFor="pageSize">Page:</label>
					<select
						defaultValue={activePage}
						onChange={(e) => setActivePage(e.target.value)}
					>
						<option value="1">1</option>
						<option value="2">2</option>
					</select>
				</span>
				<span>
						Showing entries {(activePage - 1) * itemsPerPage + 1} to {activePage * itemsPerPage} of {data && data.length}
				</span>
			</div>
		</div>
	);
}

export default Data;
