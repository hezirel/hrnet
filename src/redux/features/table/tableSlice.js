import {
	createSlice
} from "@reduxjs/toolkit";

const initialState = {
	activePage : 1,
	itemsPerPage : 10,
	filter : "",
	sortOrder : {
		column: "id",
		order: 1,
	},
};

const tableSlice = createSlice({
	name: "table",
	initialState,
	reducers: {
		pageSize: (state, action) => {
			state.itemsPerPage = action.payload.target.value;
		},
		filterSearch: (state, action) => {
			state.filter = action.payload;
		},
		changePage: (state, action) => {
			state.activePage = action.payload;
		},
		sortColumn: (state, action) => {
			state.sortOrder = action.payload;
		}
	},
});

export const {
	pageSize,
	filterSearch,
	changePage,
	sortColumn,
} = tableSlice.actions;

export default tableSlice.reducer;
