import {
	React,
	useState,
} from "react";

import PropTypes from "prop-types";

import Rows from "./Rows";

const columns = [
	{
		title: "#",
		dataIndex: "id",
	},
	{
		title: "First Name",
		dataIndex: "firstName",
	},
	{
		title: "Last Name",
		dataIndex: "lastName",
	},
	{
		title: "Department",
		dataIndex: "department",
	},
	{
		title: "Date of Birth",
		dataIndex: "dob",
	},
	{
		title: "Start Date",
		dataIndex: "startDate",
	},
	{
		title: "State",
		dataIndex: "state",
	},
	{
		title: "City",
		dataIndex: "city",
	},
	{
		title: "Street",
		dataIndex: "street",
	},
	{
		title: "Zip",
		dataIndex: "zip",
	}
];

const DataTable = ({ data }) => {

	const [activePage, setActivePage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [filter, setFilter] = useState("");
	const [sort, setSort] = useState({
		column: "id",
		order: 1,
	});
	// If a filter is set, filter data
	const filtered = filter.length > 2 ?
		(data.filter(subject => 
			Object.entries(subject).some(entry => 
				typeof(entry[1]) === "string" && 
				entry[1].toLowerCase().includes(filter.toLowerCase())))) :
		data;
	// Sort data
	const query = [...filtered].sort((a, b) => {
		if (a[sort.column] < b[sort.column]) {
			return sort.order * -1;
		}
		else if (a[sort.column] > b[sort.column]) {
			return sort.order * 1;
		} else {
			return 0;
		}
	});
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
						// Return to first page if current activePage out of new itemsPerPage range
						onChange={(e) => {
							setItemsPerPage(parseInt(e.target.value));
							setActivePage(1);
						}}
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
							{
								columns.map(column => (
									<th
										key={column.dataIndex}
										onClick={() => {
											setSort({
												column: column.dataIndex,
												order: sort.column === column.dataIndex ? -sort.order : 1,
											});
										}}
									>
										{column.title}
									</th>
								))
							}
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