import {
	createSlice
} from "@reduxjs/toolkit";

const initialState = {
	userForm: false,
};

const inputSlice = createSlice({
	name: "input",
	initialState,
	reducers: {
		addEntry: (state, action) => {
			const req = window.indexedDB.open("hrnet", 1);
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
				const tx = req.result.transaction("subjects", "readwrite");
				const subjectsStore = tx.objectStore("subjects");

				subjectsStore.add({
					...action.payload,
				});

				tx.oncomplete = () => {
					console.log("Transaction completed");
					req.result.close();
				};
			};
		},
	}
});

export const {
	addEntry
} = inputSlice.actions;

export default inputSlice.reducer;
