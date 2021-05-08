import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from "react-places-autocomplete";

export class MapContainer extends Component {
	constructor(props) {
		super(props);
		console.log(props.lat);
		console.log("loaded...");
		this.state = {
			// for google map places autocomplete
			address: "",

			showingInfoWindow: false,
			activeMarker: {},
			selectedPlace: {},

			mapCenter: {
				lat: 43.764115,
				lng: -79.5058454,
			},
		};
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

	render() {
		return (
			<div id="googleMaps">
				{/* <PlacesAutocomplete
					value={this.state.address}
					onChange={this.handleChange}
					onSelect={this.handleSelect}
				>
					{({
						getInputProps,
						suggestions,
						getSuggestionItemProps,
						loading,
					}) => (
						<div>
							<input
								{...getInputProps({
									placeholder: "Search Places ...",
									className: "location-search-input",
								})}
							/>
							<div className="autocomplete-dropdown-container">
								{loading && <div>Loading...</div>}
								{suggestions.map((suggestion) => {
									const className = suggestion.active
										? "suggestion-item--active"
										: "suggestion-item";
									// inline style for demonstration purpose
									const style = suggestion.active
										? { backgroundColor: "#fafafa", cursor: "pointer" }
										: { backgroundColor: "#ffffff", cursor: "pointer" };
									return (
										<div
											{...getSuggestionItemProps(suggestion, {
												className,
												style,
											})}
										>
											<span>{suggestion.description}</span>
										</div>
									);
								})}
							</div>
						</div>
					)}
				</PlacesAutocomplete> */}

				{/* <Map
					google={this.props.google}
					style={{ width: "35%", height: "35%", position: "relative" }}
					initialCenter={{
						lat: this.props.lat,
						lng: this.props.lng,
					}}
					center={{
						lat: this.props.lat,
						lng: this.props.lng,
					}}
				>
					<Marker
						position={{
							lat: this.props.lat,
							lng: this.props.lng,
						}}
					/>
				</Map> */}

				<Map
					google={this.props.google}
					style={{
						width: "35%",
						height: "36%",

						position: "relative",
					}}
					initialCenter={{
						lat: this.state.mapCenter.lat,
						lng: this.state.mapCenter.lng,
					}}
					center={{
						lat: this.state.mapCenter.lat,
						lng: this.state.mapCenter.lng,
					}}
				>
					<Marker
						position={{
							lat: this.state.mapCenter.lat,
							lng: this.state.mapCenter.lng,
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
