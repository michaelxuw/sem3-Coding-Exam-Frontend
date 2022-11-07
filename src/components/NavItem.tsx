import React from "react";
import { NavLink } from "react-router-dom";

interface NavItemProps {
	label: string;
	icon: string;
	route: string;
	end?: boolean;
}

function NavItem({ label, icon, route, end }: NavItemProps) {
	return (
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
	);
}

export default NavItem;
