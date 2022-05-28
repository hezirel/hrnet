import { 
	combineReducers
} from "@reduxjs/toolkit";

import input from "../features/inputSlice";
import api from "../services/dbApi";

const rootReducer = combineReducers({
	input,
	[api.reducerPath]: api.reducer,
});


export default rootReducer;
