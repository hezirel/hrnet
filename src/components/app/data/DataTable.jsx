import {
	React,
} from "react";

import { 
	useSelector,
	useDispatch,
} from "react-redux";

import PropTypes from "prop-types";

import {
	
	changePage,
	sortColumn,
} from "../../../redux/features/table/tableSlice";

import Rows from "./Rows";
import DataHeader from "./modules/DataHeader";

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

	const dispatch = useDispatch();
	const activePage = useSelector(state => state.table.activePage);
	const itemsPerPage = useSelector(state => state.table.itemsPerPage);
	const filter = useSelector(state => state.table.filter);
	const sort = useSelector(state => state.table.sortOrder);

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
			<DataHeader querySize={query.length} />
			<div className="dataTable">
				<table>
					<thead>
						<tr>
							{
								columns.map(column => (
									<th
										key={column.dataIndex}
										onClick={() => {
											dispatch(sortColumn({
												column: column.dataIndex,
												order: sort.column === column.dataIndex ? -sort.order : 1,
											}));
										}}
										style={sort.column === column.dataIndex ? {
											color: sort.order === 1 ? "green" : "red",
										} : {}}
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
						onChange={(e) => dispatch(changePage(e.target.value))}
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