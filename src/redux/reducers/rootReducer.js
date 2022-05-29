import { 
	combineReducers
} from "@reduxjs/toolkit";

import table from "../features/table/tableSlice";
import input from "../features/inputSlice";
import api from "../services/dbApi";

const rootReducer = combineReducers({
	input,
	table,
	[api.reducerPath]: api.reducer,
});


export default rootReducer;
