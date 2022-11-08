import React from "react";
import { NavLink } from "react-router-dom";
import Role from "../types/entities/role";
import { validateRoles } from "../utils/credentialHelper";

interface NavItemProps {
	label: string;
	icon: string;
	route: string;
	end?: boolean;
	allowedRoles?: Role[];
}

function NavItem({ label, icon, route, end, allowedRoles }: NavItemProps) {
	const auth = !allowedRoles || validateRoles(allowedRoles);
	return auth ? (
		<NavLink
			end={end}
			className={active =>
				`${
					active.isActive ? "bg-green-500" : "hover:scale-105"
				} active:scale-95 transition-all text-white px-4 py-2 flex gap-2 justify-center items-center`
			}
			to={route}
		>
			<i className={`fa fa-fw fa-${icon}`} />
			<p>{label}</p>
		</NavLink>
	) : (
		<></>
	);
}

export type { NavItemProps };
export default NavItem;
