import {
	createSlice
} from "@reduxjs/toolkit";

const initialState = {
	pageSize: 10,
	page: 1,
	filter: "",
	sort: false,
};

const tableSlice = createSlice({
	name: "table",
	initialState,
	reducers: {
		pageSize: (state, action) => {
			state.pageSize = action.payload;
			return state;
		},
	},
});

export const {
	pageSize
} = tableSlice.actions;

export default tableSlice.reducer;
