import React, { Dispatch, SetStateAction, useContext, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import Login from "./Login.jsx";
import LoggedIn from "./LoggedIn.jsx";
import NavItem from "./NavItem.js";
import { useAuth } from "../hooks/AuthContext.js";
import { getUserInfo } from "../utils/credentialHelper.js";
import GuardedRoute from "@/components/GuardedRoute";

interface HeaderProps {
	setErrorMsg?: () => void;
}

function Header({ setErrorMsg }: HeaderProps) {
	const { state } = useAuth();

	return (
		<nav className="w-full flex bg-gray-600 h-[50px] gap-2">
			<NavItem route={"/sem3-coding-exam-frontend/"} icon={"home"} label={"Home"} end />
			<NavItem permissionRequired={"ADMIN"} route={"/sem3-coding-exam-frontend/adminFestivals"} icon={"star"} label={"Festivals"} />
			<NavItem permissionRequired={"USER"} route={"/sem3-coding-exam-frontend/guestFestivals"} icon={"star"} label={"Festivals"} />
			<NavItem permissionRequired={"USER"} route={"/sem3-coding-exam-frontend/guestShows"} icon={"star"} label={"Shows"} />


			<div className="ml-auto flex items-center justify-center">
				{!state.loggedIn ? (
					<Login />
				) : (
					<>
						<div>
							<p className="text-white px-4">
								{"Name: " +
									state.email.charAt(0).toUpperCase() +
									state.email.substring(1)}
							</p>
							<p className="text-white px-4">
								{"Roles: " +
									state.pms}
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
