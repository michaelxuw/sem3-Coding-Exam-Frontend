import React, { Dispatch, SetStateAction, useState } from "react";
import { NavLink } from "react-router-dom";
import Login from "./Login.jsx";
import LoggedIn from "./LoggedIn.jsx";
import NavItem from "./NavItem.js";

interface HeaderProps {
	setErrorMsg?: () => void;
	loggedIn: boolean;
	setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

function Header({ setErrorMsg, loggedIn, setLoggedIn }: HeaderProps) {
	return (
		<nav className="w-full flex bg-gray-600 h-[50px] gap-2">
			<NavItem route={"/"} icon={"home"} label={"Home"} end />
			<NavItem route={"/persons"} icon={"users"} label={"Persons"} />
			<NavItem route={"/search"} icon={"search"} label={"Search"} />
			<NavItem route={"/contact"} icon={"envelope"} label={"Contact"} />

			<div className="ml-auto flex items-center justify-center">
				{!loggedIn ? (
					<Login setLoggedIn={setLoggedIn} setErrorMsg={setErrorMsg} />
				) : (
					<LoggedIn setLoggedIn={setLoggedIn} />
				)}
			</div>
		</nav>
	);
}

export default Header;
