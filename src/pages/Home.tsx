import React, { useEffect, useState } from "react";
import facade from "../api/apiFacade";
import { useAuth } from "../stores/AuthContext";

function Home() {
	const { state: authState } = useAuth();
	const [greeting, setGreeting] = useState("");

	useEffect(() => {
		const getGreeting = async () => {
			let newGreeting = "Welcome!";
			if (authState.pms === "ADMIN") newGreeting = await facade.fetchAdminGreeting();
			else if (authState.pms === "USER")
				newGreeting = await facade.fetchUserGreeting();
			setGreeting(newGreeting);
		};
		getGreeting();
	}, [authState.loggedIn]);

	return <div>{greeting}</div>;
}

export default Home;
