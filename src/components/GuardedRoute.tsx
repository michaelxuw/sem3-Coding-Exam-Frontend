import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import facade from "../api/apiFacade";
import Unauthorized from "../pages/Unauthorized";
import AuthContext from "../stores/AuthContext";
import Role from "../types/entities/role";
import { validateRoles } from "../utils/credentialHelper";

interface GuardedRouteProps {
	allowedRoles: Role[];
	refresh?: any;
}

function GuardedRoute({ allowedRoles, refresh }: GuardedRouteProps) {
	const [auth, setAuth] = useState(false);
	const authContext = useContext(AuthContext);

	useEffect(() => {
		const validate = async () => {
			const tokenValid = await facade.validateToken();
			const allowed = validateRoles(allowedRoles);
			setAuth(tokenValid && allowed);
		};
		validate();
		return () => {};
	}, [authContext.loggedIn, refresh]);

	return auth ? <Outlet /> : <Unauthorized />;
}

export default GuardedRoute;
