import React, { Dispatch, SetStateAction, useContext, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import Login from "./Login.jsx";
import LoggedIn from "./LoggedIn.jsx";
import NavItem from "./NavItem.js";
import { useAuth } from "../stores/AuthContext.js";
import { getUserInfo } from "../utils/credentialHelper.js";

interface HeaderProps {
	setErrorMsg?: () => void;
}

function Header({ setErrorMsg }: HeaderProps) {
	const { state } = useAuth();

	return (
		<nav className="w-full flex bg-gray-600 h-[50px] gap-2">
			<NavItem route={"/"} icon={"home"} label={"Home"} end />
			<NavItem allowedRoles={["admin"]} route={"/persons"} icon={"users"} label={"Persons"} />
			<NavItem route={"/search"} icon={"search"} label={"Search"} />
			<NavItem route={"/contact"} icon={"envelope"} label={"Contact"} />

			<div className="ml-auto flex items-center justify-center">
				{!state.loggedIn ? (
					<Login />
				) : (
					<>
						<div>
							<p className="text-white px-4">
								{"Name: " +
									state.username.charAt(0).toUpperCase() +
									state.username.substring(1)}
							</p>
							<p className="text-white px-4">
								{"Roles: " +
									state.roles.map(
										(r, i) =>
											(i > 0 ? " " : "") +
											r.charAt(0).toUpperCase() +
											r.substring(1)
									)}
							</p>
						</div>
						<LoggedIn />
					</>
				)}
			</div>
		</nav>
	);
}

export default Header;
