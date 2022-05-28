import {
	createSlice
} from "@reduxjs/toolkit";

const initialState = {
	userForm: false,
};

const setupDb = async () => {
	const req = window.indexedDB.open("hrnet", 1);
	const p = new Promise((resolve, reject) => {
		req.onupgradeneeded = (event) => {
			const db = event.target.result;
			const store = db.createObjectStore("subjects", {
				keyPath: "id",
				autoIncrement: true
			});
			store.createIndex("firstName", "firstName", {
				unique: false
			});
			store.createIndex("lastName", "lastName", {
				unique: false
			});
			store.createIndex("department", "department", {
				unique: false
			});
		};

		req.onsuccess = () => {
			resolve(req.result);
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
