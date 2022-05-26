import {
	createSlice
} from "@reduxjs/toolkit";

const initialState = {
	userEntry: false,
};

const inputSlice = createSlice({
	name: "input",
	initialState,
	reducers: {
		addEntry: (state, action) => {
			state.userEntry = action.payload;
		}
	}
});

export const {
	addEntry
} = inputSlice.actions;

export default inputSlice.reducer;
