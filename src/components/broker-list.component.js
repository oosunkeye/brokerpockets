import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import test from "./test";

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const useStyles = makeStyles({
	table: {
		minWidth: 70,
	},
});

export default function CustomizedTables({ pTitle }) {
	const [loader, setLoader] = useState(false);
	const [datas, setDatas] = useState([]);

	const _handleRemove = (id) => {
		console.log(id);
		axios
			.delete("https://brokerpocket.herokuapp.com/brokers/" + id)
			.then((response) => {
				console.log(response.data);

				console.log(response.data);
			});

		setDatas(datas.filter((el) => el._id !== id));
	};

	const _handleEdit = (id) => {
		// console.log(id);
	};

	useEffect(() => {
		setLoader(true);
		axios
			.get("https://brokerpocket.herokuapp.com/brokers/")
			.then((response) => {
				setDatas(response.data);
				console.log(response.data);
				setLoader(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const classes = useStyles();

	return (
		<>
			{loader ? (
				// <test />
				<div
					style={{
						justifyContent: "center",
						alignItems: "center",
						marginTop: 100,
						display: "flex",
					}}
				>
					{/* <h1>hello world</h1> */}
					<ClipLoader color="#3273a8" size={150} />
				</div>
			) : (
				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="customized table">
						<TableBody>
							{datas.map((data, i) => (
								<StyledTableRow key={data.id}>
									<StyledTableCell align="left">
										<b>{data.name}</b>
										<br />
										{data.email} | {data.phone}
										<br />
										{data.address}
									</StyledTableCell>
									<StyledTableCell align="right">
										<Link to={"/brokeredit?userid=" + data._id}>
											<Button
												color="primary"
												variant="outlined"
												onClick={() => _handleEdit(data._id)}
											>
												Edit
											</Button>
										</Link>
									</StyledTableCell>
									<StyledTableCell align="right">
										<Button
											color="primary"
											variant="outlined"
											onClick={() => _handleRemove(data._id)}
										>
											Delete
										</Button>
									</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</>
	);
}
