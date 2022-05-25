import React from "react";

import { 
	Provider
} from "react-redux";

import {
	HashRouter,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import {
	createRoot
} from "react-dom/client";

import { 
	store
} from "./redux/store/store";

import Entry from "./components/app/entry/Entry";
import Data from "./components/app/data/Data";

import "./index.css";
import Header from "./components/common/Header";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<HashRouter>
			<Header />
			<Provider store={store}>
				<Routes>
					<Route path="/" element={<Entry />} />
					<Route path="data" element={<Data />} />
					<Route path="*" element={<Navigate replace to="/"/>} />
				</Routes>
			</Provider>
		</HashRouter>
	</React.StrictMode>
);