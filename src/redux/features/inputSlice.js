import {
	createSlice
} from "@reduxjs/toolkit";

const initialState = {
	userForm: false,
};

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

		req.onerror = () => {
			reject(req.error);
		};
	});
	return p;
};

const DbAddEntry = (db, entry) => {

	const tx = db.transaction("subjects", "readwrite");
	const subjectsStore = tx.objectStore("subjects");

	subjectsStore.add({
		...entry,
	});

	tx.oncomplete = () => {
		console.log("Transaction completed");
		db.close();
	};
};

const inputSlice = createSlice({
	name: "input",
	initialState,
	reducers: {
		addEntry: (state, action) => {
			setupDb().then((db) => {
				DbAddEntry(db, action.payload);
			});
			state.userForm = true;
		},
	}
});

export const {
	addEntry
} = inputSlice.actions;

export default inputSlice.reducer;
