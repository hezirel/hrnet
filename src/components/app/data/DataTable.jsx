import {
	React,
	useState,
} from "react";

import PropTypes from "prop-types";

import Rows from "./Rows";

const DataTable = ({ data }) => {

	const [activePage, setActivePage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [filter, setFilter] = useState("");
	const totalLength = data && Math.ceil(data.length / itemsPerPage);

	return (
		<>
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
							filter.length > 2 ? 
								<Rows data={
									(data.filter(subject => 
										Object.entries(subject).some(entry => 
											typeof(entry[1]) === "string" && 
												entry[1].toLowerCase().includes(filter.toLowerCase()))))
								}/>
								: 
								<Rows data={data.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)}/>
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
						{
							Array.from(Array(totalLength).keys()).map(page => (
								<option key={page + 1} value={page + 1}>{page + 1}</option>
							))
						}
					</select>
				</span>
				<span>
				Showing entries {(activePage - 1) * itemsPerPage + 1} to {activePage * itemsPerPage} of {data && data.length}
				</span>
			</div>
		</>
	);
};

DataTable.propTypes = {
	data: PropTypes.array.isRequired,
};

export default DataTable;