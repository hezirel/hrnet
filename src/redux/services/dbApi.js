import {
	createApi,
} from "@reduxjs/toolkit/query/react";

const formShape = [
	"firstName",
	"lastName",
	"department",
	"dateOfBirth",
	"startDate",
	"street",
	"city",
	"state",
	"zipCode",
];

const setupDb = async () => {

	const req = window.indexedDB.open("hrnet", 1);

	const p = new Promise((resolve, reject) => {

		req.onupgradeneeded = (event) => {
			event.preventDefault();
			const db = event.target.result;
			const store = db.createObjectStore("subjects", {
				keyPath: "id",
				autoIncrement: true
			});
			formShape.forEach((field) => {
				store.createIndex(field, field, {
					unique: false
				});
			});
		};

		req.onsuccess = (e) => {
			e.preventDefault();
			resolve(e.target.result);
		};

		req.onerror = (e) => {
			e.preventDefault();
			console.warn("Error opening database", e);
			reject();
		};
	});

	return p;
};

const DbAddEntry = (entry) => {

	const p = new Promise((resolve, reject) => {
		setupDb().then((db) => {
			const tx = db.transaction("subjects", "readwrite");
			const subjectsStore = tx.objectStore("subjects");

			subjectsStore.add({
				...entry,
			});

			tx.oncomplete = () => {
				console.log("Transaction completed");
				db.close();
				resolve();
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

const DbGetEntries = () => {

	const p = new Promise((resolve, reject) => {
		setupDb().then((db) => {
			const tx = db.transaction("subjects", "readonly");
			const select = tx.objectStore("subjects");
	
			const results = [];
	
			select.openCursor().onsuccess = (event) => {
				const cursor = event.target.result;
				if (cursor) {
					results.push(cursor.value);
					cursor.continue();
				} else {
					console.log("All entries retrieved");
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
			queryFn: (payload) => {
				DbAddEntry(payload);
			}
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