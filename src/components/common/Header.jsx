import {
	React
} from "react";

import { 
	NavLink,
} from "react-router-dom";

import "./Header.css";

const Header = () => {
	return (
		<header className="header-main">
			<nav className="header-container">
				<NavLink to="/" className="header-nav-link">Entry</NavLink>
				<NavLink to="/data" className="header-nav-link">Data Display</NavLink>
			</nav>
		</header>
	);
};

export default Header;
