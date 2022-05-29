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
			reject(e.target);
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

export const dbApi = createApi({
	reducerPath: "services/dbApi",
	endpoints: (build) => ({
		DbInsert: build.mutation({
			queryFn: (payload) => {
				DbAddEntry(payload);
			},
		}),
	})
});

export const {
	useDbInsertMutation,
} = dbApi;

export default dbApi;