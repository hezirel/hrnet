import { 
	combineReducers
} from "@reduxjs/toolkit";

import input from "../features/inputSlice";
import table from "../features/table/tableSlice";
import api from "../services/dbApi";

const rootReducer = combineReducers({
	input,
	table,
	[api.reducerPath]: api.reducer,
});


export default rootReducer;
