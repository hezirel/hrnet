import {
	React,
} from "react";

import { 
	useSelector
} from "react-redux";

import {
	useDbGetQuery,
} from "../../../redux/services/dbApi";

import {
	filterSearch,
	pageSize
} from "../../../redux/features/table/tableSlice";

import {
	useDispatch
} from "react-redux";

import "./Data.css";

function Data() {

	const dispatch = useDispatch();
	const size = useSelector((state) => state.table?.pageSize);
	const filter = useSelector((state) => state.table?.filter);
	const {data, isError, error, refetch} = useDbGetQuery(size, filter);

	const handleSize = (event) => {
		dispatch(pageSize(event.target.value));
	};

	const handleSearch = (event) => {
		if (event.target.value.length > 2) {
			dispatch(filterSearch(event.target.value));
			refetch();
		} else {
			dispatch(filterSearch(false));
			refetch();
		}
	};

	return (
		<div className="dataView">
			<div className="dataTitle">
				<h1>List of current Subjects</h1>
			</div>
			<div className="searchHeader">
				<span>
					<label htmlFor="pageSize">Entries per page:</label>
					<select onChange={handleSize}>
						<option value="10">10</option>
						<option value="25">25</option>
						<option value="50">50</option>
						<option value="100">100</option>
					</select>
				</span>
				<input 
					type="text" 
					placeholder={filter.length > 2 ? filter : "Search"}
					value={filter ? filter : null}
					minLength={3}
					onChange={handleSearch}
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
							data && data.map(subject => (
								<tr key={subject.id}>
									<td>{subject.firstName}</td>
									<td>{subject.lastName}</td>
									<td>{subject.department}</td>
									<td>{subject.DOB}</td>
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
