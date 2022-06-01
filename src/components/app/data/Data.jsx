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
			{data && <DataTable data={data} />}
			{isError && <div className="error">{error}</div>}
		</div>
	);
}

export default Data;
