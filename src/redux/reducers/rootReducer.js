import { 
	combineReducers
} from "@reduxjs/toolkit";

import input from "../features/inputSlice";

const rootReducer = combineReducers({
	input
});


export default rootReducer;
