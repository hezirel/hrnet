import {
	React,
} from "react";

import "./Entry.css";

function Entry() {
	return (
		<div className="entryView">
			<div className="entryTitle">
				<h1>Add a subject to database</h1>
			</div>
			<div className="entryForm">
				<form onSubmit={(e) => e.preventDefault()}>

				</form>
			</div>
		</div>
	);
}

export default Entry;
