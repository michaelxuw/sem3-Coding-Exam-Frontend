import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import GuardedRoute from "./components/GuardedRoute";
import Header from "./components/Header";
import Home from "./pages/Home";
import { AuthProvider, useAuth } from "./hooks/AuthContext";
import AdminFestivals from "@/pages/AdminFestivals";
import GuestFestivals from "@/pages/GuestFestivals";

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
				<Route path="/adminFestivals" element={<GuardedRoute permissionRequired={"ADMIN"} />}>
					<Route index element={<AdminFestivals />} />
				</Route>
				<Route path="/guestFestivals" element={<GuardedRoute permissionRequired={"USER"} />}>
					<Route index element={<GuestFestivals />} />
				</Route>
				<Route path="*" element={<h1>404 Page Not Found !!!!</h1>} />
			</Routes>
		</>
	);
}

export default App;
