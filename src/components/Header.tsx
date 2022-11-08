import React, { Dispatch, SetStateAction, useContext, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import Login from "./Login.jsx";
import LoggedIn from "./LoggedIn.jsx";
import NavItem from "./NavItem.js";
import AuthContext from "../stores/AuthContext.js";
import { getUsername } from "../utils/credentialHelper.js";

interface HeaderProps {
	setErrorMsg?: () => void;
}

function Header({ setErrorMsg }: HeaderProps) {
	const { loggedIn } = useContext(AuthContext);
	const username: string | undefined = useMemo(getUsername, [loggedIn]);

	return (
		<nav className="w-full flex bg-gray-600 h-[50px] gap-2">
			<NavItem route={"/"} icon={"home"} label={"Home"} end />
			<NavItem allowedRoles={["admin"]} route={"/persons"} icon={"users"} label={"Persons"} />
			<NavItem route={"/search"} icon={"search"} label={"Search"} />
			<NavItem route={"/contact"} icon={"envelope"} label={"Contact"} />

			<div className="ml-auto flex items-center justify-center">
				{!loggedIn ? (
					<Login />
				) : (
					<>
						<p className="text-white px-4">{username?.toUpperCase()}</p>
						<LoggedIn />
					</>
				)}
			</div>
		</nav>
	);
}

export default Header;
