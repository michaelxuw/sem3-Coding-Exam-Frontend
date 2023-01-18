import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import GuardedRoute from "./components/GuardedRoute";
import Header from "./components/Header";
import Home from "./pages/Home";
import { AuthProvider, useAuth } from "./hooks/AuthContext";
import AdminFestivals from "@/pages/AdminFestivals";
import GuestFestivals from "@/pages/GuestFestivals";
import GuestShows from "@/pages/GuestShows";
import AdminShows from "@/pages/AdminShows";

function App() {
	const { autoLogin } = useAuth();

	useEffect(() => {
		autoLogin();
	}, []);

	return (
		<>
			<Header />
			<Routes>
				<Route path="/sem3-coding-exam-frontend/" element={<Home />} />
				<Route path="/sem3-coding-exam-frontend/adminFestivals" element={<GuardedRoute permissionRequired={"ADMIN"} />}>
					<Route index element={<AdminFestivals />} />
				</Route>
				<Route path="/sem3-coding-exam-frontend/adminShows" element={<GuardedRoute permissionRequired={"ADMIN"} />}>
					<Route index element={<AdminShows />} />
				</Route>
				<Route path="/sem3-coding-exam-frontend/guestFestivals" element={<GuardedRoute permissionRequired={"USER"} />}>
					<Route index element={<GuestFestivals />} />
				</Route>
				<Route path="/sem3-coding-exam-frontend/guestShows" element={<GuardedRoute permissionRequired={"USER"} />}>
					<Route index element={<GuestShows />} />
				</Route>
				<Route path="*" element={<h1>404 Page Not Found !!!!</h1>} />
			</Routes>
		</>
	);
}

export default App;
