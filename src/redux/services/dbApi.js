import {
	createApi,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const dbApi = createApi({
	reducerPath: "services/dbApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "/"
	}),
	tagTypes: ["DBConnect"],
	endpoints: (build) => ({
		DbConnect: build.query({
			queryFn: () => ({payload: {}}),
		}),
	})
});

export const {
	useDbConnectQuery,
} = dbApi;

export default dbApi;