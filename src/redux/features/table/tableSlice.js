import {
	createSlice
} from "@reduxjs/toolkit";

const initialState = {
	pageSize: 10,
	page: 1,
	filter: false,
	sort: false,
};

const tableSlice = createSlice({
	name: "table",
	initialState,
	reducers: {
		pageSize: (state, action) => {
			state.pageSize = action.payload;
		},
		filterSearch: (state, action) => {
			state.filter = action.payload;
		}
	},
});

export const {
	pageSize,
	filterSearch
} = tableSlice.actions;

export default tableSlice.reducer;
