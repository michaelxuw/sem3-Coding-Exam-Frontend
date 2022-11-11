import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import GuardedRoute from "./components/GuardedRoute";
import Header from "./components/Header";
import Home from "./pages/Home";
import User from "./pages/User";
import { AuthProvider, useAuth } from "./stores/AuthContext";

function App() {
	const { autoLogin } = useAuth();

	useEffect(() => {
		autoLogin();
	}, []);

	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/persons" element={<GuardedRoute allowedRoles={["admin"]} />}>
					<Route index element={<User />} />
				</Route>
				<Route path="*" element={<h1>404 Page Not Found !!!!</h1>} />
			</Routes>
		</>
	);
}

export default App;
