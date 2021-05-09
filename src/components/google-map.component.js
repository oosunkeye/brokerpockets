import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from "react-places-autocomplete";

export class MapContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			// for google map places autocomplete
			address: "",
			john: true,

			showingInfoWindow: false,
			activeMarker: {},
			selectedPlace: {},

			mapCenter: {
				lat: props.lat,
				lng: props.lng,
			},

			latNew: props.lat,
			lngNew: props.lng,
		};

		this.setState({ latNew: "props.lat" });
	}

	handleChange = (address) => {
		this.setState({ address });
	};

	handleSelect = (address) => {
		this.setState({ address });

		geocodeByAddress(address)
			.then((results) => getLatLng(results[0]))
			.then((latLng) => {
				console.log("Success", latLng);

				// update center state
				this.setState({ mapCenter: latLng });
			})
			.catch((error) => console.error("Error", error));
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.lat !== this.props.lat) {
			console.log("google map state has changed.");
			this.setState({ latNew: this.props.lat, lngNew: this.props.lng });
		}
	}

	render() {
		return (
			<div id="googleMaps">
				<Map
					google={this.props.google}
					style={{ width: "35%", height: "35%", position: "relative" }}
					initialCenter={{
						lat: this.state.latNew,
						lng: this.state.lngNew,
					}}
					center={{
						lat: this.state.latNew,
						lng: this.state.lngNew,
					}}
				>
					<Marker
						position={{
							lat: this.state.latNew,
							lng: this.state.lngNew,
						}}
					/>
				</Map>
			</div>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyA1OH9LeehBK6877S44LSAit6-WD8Ld5fo",
})(MapContainer);
