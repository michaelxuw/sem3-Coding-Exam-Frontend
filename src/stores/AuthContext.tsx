import { createContext, useContext, useMemo, useReducer } from "react";
import facade from "../api/apiFacade";
import Role from "../types/entities/role";
import { getUserInfo } from "../utils/credentialHelper";

type Action = {
	type: "login" | "logout";
	[key: string]: any;
};

type State = {
	username: string;
	roles: Role[];
	loggedIn: boolean;
};

type Dispatch = (action: Action) => void;

interface AuthContextProps {
	state: State;
	dispatch: Dispatch;
}

type AuthProviderProps = { children: React.ReactNode };

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function authReducer(state: State, action: Action): State {
	switch (action.type) {
		case "login": {
			const user = getUserInfo();
			return { ...state, loggedIn: true, ...user };
		}
		case "logout": {
			facade.logout();
			return { ...state, username: "", roles: [], loggedIn: false };
		}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
}

function AuthProvider({ children }: AuthProviderProps) {
	const [state, dispatch] = useReducer(authReducer, { username: "", roles: [], loggedIn: false });

	const value = useMemo(() => ({ state, dispatch }), [state]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error("useAuth must be used within a AuthProvider");
	}

	const state = context.state;

	const login = async (username: string, password: string) => {
		try {
			await facade.login(username, password);
			context.dispatch({ type: "login" });
		} catch {}
	};

	const logout = () => {
		context.dispatch({ type: "logout" });
	};

	const revalidate = async () => {
		if (!state.loggedIn) return false;

		try {
			const isValid = await facade.validateToken();
			if (!isValid) throw new Error();
			return true;
		} catch {
			logout();
			return false;
		}
	};

	const autoLogin = async () => {
		if (facade.getToken() && (await facade.validateToken())) {
			context.dispatch({ type: "login" });
		}
	};

	const hasAccessRights = (allowedRoles: Role[]) => {
		for (const role of state.roles) {
			if (allowedRoles.includes(role)) return true;
		}
		return false;
	};

	const hasAccessRightsWithRevalidate = async (allowedRoles: Role[]) => {
		if (await revalidate()) {
			return hasAccessRights(allowedRoles);
		}
		return false;
	};

	return {
		state,
		login,
		logout,
		autoLogin,
		revalidate,
		hasAccessRights,
		hasAccessRightsWithRevalidate,
	};
}

export { AuthProvider, useAuth };
