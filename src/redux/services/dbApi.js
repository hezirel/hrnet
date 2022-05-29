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
	const req = window.indexedDB.open("hrnet");

	const p = new Promise((resolve, reject) => {

		req.onupgradeneeded = (event) => {
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
			resolve(e.target.result);
		};

		req.onerror = (e) => {
			console.warn("Error opening database", e);
			reject();
		};
	});

	return p;
};

const DbAddEntry = (entry) => {

	setupDb().then((db) => {
		const tx = db.transaction("subjects", "readwrite");
		const subjectsStore = tx.objectStore("subjects");

		subjectsStore.add({
			...entry,
		});

		tx.oncomplete = () => {
			console.log("Transaction completed");
			db.close();
		};
	});
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
					resolve(results);
				}
			};

			select.onerror = (event) => {
				console.warn("Error retrieving entries", event);
				reject();
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