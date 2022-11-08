import { useEffect, useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import facade from "./api/apiFacade";
import GuardedRoute from "./components/GuardedRoute";
import Header from "./components/Header";
import Home from "./pages/Home";
import User from "./pages/User";
import AuthContext from "./stores/AuthContext";

function App() {
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		if (!facade.validateToken()) facade.logout();
		if (facade.getToken()) setLoggedIn(true);
	}, []);

	const contextValue = useMemo(
		() => ({
			setLoggedIn,
			loggedIn,
		}),
		[setLoggedIn, loggedIn]
	);

	return (
		<>
			<AuthContext.Provider value={contextValue}>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/persons" element={<GuardedRoute allowedRoles={["admin"]} />}>
						<Route index element={<User />} />
					</Route>
					<Route path="*" element={<h1>404 Page Not Found !!!!</h1>} />
				</Routes>
			</AuthContext.Provider>
		</>
	);
}

export default App;
