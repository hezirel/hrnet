import {
	createSlice
} from "@reduxjs/toolkit";

const initialState = {
	success: false,
};

const inputSlice = createSlice({
	name: "input",
	initialState,
	reducers: {
		setSuccess: (state, action) => {
			state.success = action.payload;
		}
	},
});

export const {
	setSuccess
} = inputSlice.actions;

export default inputSlice.reducer;
