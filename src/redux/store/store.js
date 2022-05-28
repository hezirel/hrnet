import { 
	configureStore
} from "@reduxjs/toolkit";

import reducer from "../reducers/rootReducer";
import api from "../services/dbApi";

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => 
		getDefaultMiddleware({
		}).concat(api.middleware)
});
