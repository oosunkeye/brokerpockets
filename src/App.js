import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import Home from "./components/home.component";
import BrokerList from "./components/broker-list.component";
import BrokerEdit from "./components/broker-edit.component";
import GoogleMap from "./components/google-map.component";

function App() {
	return (
		<Router>
			<div className="container">
				<Navbar />
				<br />
				<Route path="/" exact component={Home} />

				<Route path="/home" component={Home} />
				<Route path="/brokerlist" component={BrokerList} />
				<Route path="/brokeredit" component={BrokerEdit} />
				<Route path="/googlemap" component={GoogleMap} />
			</div>
		</Router>
	);
}

export default App;
