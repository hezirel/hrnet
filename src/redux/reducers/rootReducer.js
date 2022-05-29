import { 
	combineReducers
} from "@reduxjs/toolkit";

import table from "../features/table/tableSlice";
import api from "../services/dbApi";

const rootReducer = combineReducers({
	table,
	[api.reducerPath]: api.reducer,
});


export default rootReducer;
