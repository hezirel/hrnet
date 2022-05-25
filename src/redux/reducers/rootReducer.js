import { 
	combineReducers
} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
	action: (state = {}) => state,
});


export default rootReducer;
