import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Grid, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
// import Table from "./Table";
import axios from "axios";
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from "react-places-autocomplete";

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
	const [userid, setUserID] = useState("");
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		let user = params.get("userid");
		setUserID(user);
		axios
			.get("https://brokerpocket.herokuapp.com/brokers/" + user)
			.then((response) => {
				// setDatas(response.data);

				setNames(response.data.name);
				setEmail(response.data.email);
				setPhoneNumber(response.data.phone);
				setAddress(response.data.address);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const [names, setNames] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");

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
	};

	const handleChange = (address) => {
		setAddress(address);
	};

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
			.post(
				"https://brokerpocket.herokuapp.com/brokers/update/" + userid,
				userInfo
			)
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
							label="Name..."
							color="primary"
							value={names}
							onChange={(e) => setNames(e.target.value)}
						/>
						<TextField
							variant="filled"
							label="Email"
							name="email"
							color="primary"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<TextField
							variant="filled"
							label="Phone Number"
							color="primary"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
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
										{...getInputProps({ placeholder: "Type address" })}
									/>

									<div>
										{loading ? <div>...loading</div> : null}

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
							Save Changes
						</Button>
					</Grid>
					{/* <Grid item xs={3}>
						{" "}
						<Button variant="outlined" size="small" color="primary">
							Delete
						</Button>
					</Grid> */}
					<Grid item xs={3}></Grid>
				</Grid>
			</form>
		</>
	);
}
