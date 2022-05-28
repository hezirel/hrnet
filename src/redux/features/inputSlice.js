import {
	createSlice
} from "@reduxjs/toolkit";

const initialState = {
	userEntry: false,
	db: false
};

const inputSlice = createSlice({
	name: "input",
	initialState,
	reducers: {
		addEntry: (state, action) => {
			console.log(action);
			state.userEntry = true;
		}
	},
});

export const {
	addEntry
} = inputSlice.actions;

export default inputSlice.reducer;
