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
	// If a filter is set, filter data
	const query = filter.length > 2 ?
		(data.filter(subject => 
			Object.entries(subject).some(entry => 
				typeof(entry[1]) === "string" && 
				entry[1].toLowerCase().includes(filter.toLowerCase())))) :
		data;
	// Total number of pages from data.length / itermPerPage
	const totalLength = Math.ceil(query.length / itemsPerPage);
	const pages = Array.from(Array(totalLength).keys());

	return (
		<>
			<div className="searchHeader">
				<span>
					<label htmlFor="pageSize">Entries per page:</label>
					<select 
						defaultValue={itemsPerPage}
						onChange={(e) => setItemsPerPage(e.target.value)}
					>
						{
							/* Adjust items per page options to query length rounded down to previous step*/
							["10", "25", "50", "100"].map(value => {
								return parseInt(value) <= query.length &&
									<option key={value} value={value}>{value}</option>;
							})
						}
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
							<Rows data={query.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)}/>
						}
					</tbody>
				</table>
			</div>
			<div className="tableFooter">
				<span>
					<label htmlFor="pageNum">Page:</label>
					<select
						defaultValue={activePage}
						onChange={(e) => setActivePage(e.target.value)}
					>
						{
							/* Adjust select to fit real numbers of page */
							pages.map(page => (
								<option key={page + 1} value={page + 1}>{page + 1}</option>
							))
						}
					</select>
				</span>
				<span>
					Showing entries {(activePage - 1) * itemsPerPage + 1} to {(activePage * itemsPerPage) > query.length ? query.length : (activePage * itemsPerPage)} of {query && query.length}
				</span>
			</div>
		</>
	);
};

DataTable.propTypes = {
	data: PropTypes.array.isRequired,
};

export default DataTable;