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
			<div className="header-container">
				<nav className="header-nav">
					<ul className="header-nav-list">
						<li className="header-nav-item">
							<NavLink to="/" className="header-nav-link">Entry</NavLink>
						</li>
						<li className="header-nav-item">
							<NavLink to="/data" className="header-nav-link">Data Display</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
