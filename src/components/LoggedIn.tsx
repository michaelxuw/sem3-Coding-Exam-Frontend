import React, { Dispatch, SetStateAction, useContext } from "react";
import { useNavigate } from "react-router-dom";
import facade from "../api/apiFacade.js";
import AuthContext from "../stores/AuthContext.js";
import Button from "./Button.js";

function LoggedIn() {
	const navigate = useNavigate();
	const { setLoggedIn } = useContext(AuthContext);
	const logout = () => {
		facade.logout();
		setLoggedIn && setLoggedIn(false);
		navigate("/");
	};

	return (
		<div>
			<Button onClick={logout}>Log Out</Button>
		</div>
	);
}

export default LoggedIn;
