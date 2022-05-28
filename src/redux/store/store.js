import { 
	configureStore
} from "@reduxjs/toolkit";

import reducer from "../reducers/rootReducer";
import api from "../services/dbApi";

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => 
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					"services/dbApi/executeQuery/fulfilled",
					"services/dbApi",
				],
				ignoredPaths: [
					"input.db"
				],
			}
		}).concat(api.middleware)
});
