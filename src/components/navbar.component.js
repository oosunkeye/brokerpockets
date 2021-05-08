import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
	render() {
		return (
			<nav className="navbar navbar-dark bg-dark navbar-expand-lg">
				<Link to="/" className="navbar-brand">
					BrokerPocket
				</Link>
				<div className="collpase navbar-collapse">
					<ul className="navbar-nav mr-auto">
						<li className="navbar-item">
							<Link to="/home" className="nav-link">
								BrokerPocket Home
							</Link>
						</li>
						<li className="navbar-item">
							<Link to="/brokerlist" className="nav-link">
								Broker Users
							</Link>
						</li>
						{/* <li className="navbar-item">
							<Link to="/googlemap" className="nav-link">
								Map
							</Link>
						</li> */}
					</ul>
				</div>
			</nav>
		);
	}
}
