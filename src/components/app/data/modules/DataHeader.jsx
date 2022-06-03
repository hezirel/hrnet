import {
	React,
} from "react";

import { 
	useDispatch,
	useSelector,
} from "react-redux";

import PropTypes from "prop-types";

import {
	pageSize,
	changePage,
	filterSearch,
} from "../../../../redux/features/table/tableSlice";

const DataHeader = ({ querySize }) => {

	const dispatch = useDispatch();
	const filter = useSelector(state => state.table.filter);
	const pages = useSelector(state => state.table.pages);

	return (
		<div className="searchHeader">
			<span>
				<label htmlFor="pageSize">Entries per page:</label>
				<select 
					// Return to first page if current activePage out of new itemsPerPage range
					defaultValue={pages}
					onChange={(e) => {
						dispatch(pageSize(e.target.value));
						dispatch(changePage(1));
					}}
				>
					{
						/* Adjust items per page options to query length rounded down to previous step*/
						["10", "25", "50", "100"].map((value, i) => {
							return ((parseInt(value) <= querySize) || (i === 0)) &&
                            <option key={value} value={value}>{value}</option>;
						})
					}
				</select>
			</span>
			<input 
				type="text" 
				placeholder={"Search"}
				minLength={3}
				defaultValue={filter}
				onChange={(e) => {
					dispatch(filterSearch(e.target.value));
				}}
			/>
		</div>
	);
};

DataHeader.propTypes = {
	querySize: PropTypes.number.isRequired,
};


export default DataHeader;
