import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
	const [loggedIn, setLoggedIn] = useState(false);

	return (
		<>
			<Header setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="*" element={<h1>404 Page Not Found !!!!</h1>} />
			</Routes>
		</>
	);
}

export default App;
