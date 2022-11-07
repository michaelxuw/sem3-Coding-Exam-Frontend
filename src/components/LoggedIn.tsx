import React, { Dispatch, SetStateAction } from "react";
import facade from "../api/apiFacade.js";
import Button from "./Button.js";

interface LoggedInProps {
	setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

function LoggedIn({ setLoggedIn }: LoggedInProps) {
	const logout = () => {
		facade.logout();
		setLoggedIn(false);
	};

	return (
		<div>
			<Button onClick={logout}>Log Out</Button>
		</div>
	);
}

export default LoggedIn;
