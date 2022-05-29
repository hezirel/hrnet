import {
	createApi,
} from "@reduxjs/toolkit/query/react";

import indexDbSetup from "./dbConnect";

const DbAddEntry = (entry) => {

	const p = new Promise((resolve, reject) => {
		indexDbSetup().then((db) => {
			const tx = db.transaction("subjects", "readwrite");
			const subjectsStore = tx.objectStore("subjects");

			subjectsStore.add(entry).onsuccess = (event) => {
				resolve(event.target.result);
			};

			tx.onerror = () => {
				console.warn("Transaction not opened due to error: ");
				db.close();
				reject({error: tx.error});
			};
		});
	});
	return p;
};

const DbGetEntries = (size, filter) => {

	const p = new Promise((resolve, reject) => {
		indexDbSetup().then((db) => {
			const tx = db.transaction("subjects", "readonly");
			const select = tx.objectStore("subjects");
			const query = filter.getState().table.filter;
			console.log(query);
	
			const results = [];
	
			select.openCursor().onsuccess = (event) => {
				const cursor = event.target.result;
				if (cursor && cursor.value.id < size) {
					if (query) {
						if (cursor.value.firstName.includes(query)) {
							results.push(cursor.value);
						}
					} else {
						results.push(cursor.value);
					}
					cursor.continue();
				}
				else {
					db.close();
					resolve({data: results});
				}
			};
			select.onerror = (event) => {
				console.warn("Error retrieving entries", event);
				reject({error: event});
			};
		});
	});
	return p;
};

export const dbApi = createApi({
	reducerPath: "services/dbApi",
	endpoints: (build) => ({
		DbInsert: build.mutation({
			queryFn: DbAddEntry,
		}),
		DbGet: build.query({
			queryFn: DbGetEntries,
		}),
	})
});

export const {
	useDbInsertMutation,
	useDbGetQuery,
} = dbApi;

export default dbApi;