import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { Grid, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import axios from "axios";

import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from "react-places-autocomplete";

import GoogleMaps from "./google-map.component";

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(1),
		"& .MuiFormControl-root": {
			margin: theme.spacing(1),
			width: "100%",
		},
		margin: {
			margin: theme.spacing(1),
		},
	},
}));

export default function ColorTextFields() {
	const [names, setNames] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");
	const [selectedAddress, setSelectedAddress] = useState(false);

	const [addressAuto, setAddressAuto] = React.useState("");
	const [coordinates, setCoordinates] = React.useState({
		lat: null,
		lng: null,
	});

	const handleSelect = async (value) => {
		const results = await geocodeByAddress(value);
		const latLng = await getLatLng(results[0]);
		setAddressAuto(value);
		setCoordinates(latLng);
		setAddress(value);
		setSelectedAddress(true);
		console.log(value);
	};

	const handleChange = (address) => {
		setAddress(address);
	};

	// console.log	("address");
	const handleSubmit = (e) => {
		e.preventDefault();

		const userInfo = {
			name: names,
			email: email,
			phone: phoneNumber,
			address: address,
		};

		console.log(userInfo);

		axios
			.post("https://brokerpocket.herokuapp.com/brokers/add", userInfo)
			.then((res) => (window.location = "/brokerlist"));
		// setNames("");
		// setEmail("");
	};

	const classes = useStyles();

	return (
		<>
			<form className={classes.root}>
				<Grid justify="center" alignItems="center" spacing={2}>
					<Grid item xs={6}>
						<TextField
							variant="filled"
							label="Name"
							color="primary"
							value={names}
							onChange={(e) => setNames(e.target.value)}
							required
						/>
						<TextField
							variant="filled"
							label="Email"
							name="email"
							color="primary"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<TextField
							variant="filled"
							label="Phone Number"
							color="primary"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
							required
						/>
						<PlacesAutocomplete
							value={address}
							onChange={handleChange}
							onSelect={handleSelect}
						>
							{({
								getInputProps,
								suggestions,
								getSuggestionItemProps,
								loading,
							}) => (
								<div>
									<TextField
										variant="filled"
										label="Address"
										color="primary"
										required
										{...getInputProps({ placeholder: "Type address" })}
									/>

									<div>
										{loading ? <div>loading...</div> : null}

										{suggestions.map((suggestion) => {
											const style = {
												backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
											};

											return (
												<div {...getSuggestionItemProps(suggestion, { style })}>
													{suggestion.description}
												</div>
											);
										})}
									</div>
								</div>
							)}
						</PlacesAutocomplete>
					</Grid>
				</Grid>
				<div style={{ margin: 10 }}></div>
				<Grid container justify="center" alignItems="center" spacing={10}>
					<Grid item xs={3}></Grid>
					<Grid item xs={3}>
						{" "}
						<Button
							variant="contained"
							size="small"
							color="primary"
							onClick={handleSubmit}
						>
							Save
						</Button>
					</Grid>
					<Grid item xs={3}></Grid>
				</Grid>
				<div style={{ margin: 100 }}></div>
			</form>

			{selectedAddress && (
				<>
					<GoogleMaps lat={coordinates.lat} lng={coordinates.lng} />
				</>
			)}
		</>
	);
}
