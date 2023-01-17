import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthContext";

function Home() {
	const { state: authState } = useAuth();
	const [greeting, setGreeting] = useState("");

	useEffect(() => {
		const getGreeting = async () => {
			let newGreeting = "Welcome! \nFestival is all done";
			setGreeting(newGreeting);
		};
		getGreeting();
	}, [authState.loggedIn]);

	return <div>{greeting}</div>;
}

export default Home;
