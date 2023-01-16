import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./assets/css/main.css";
import { AuthProvider } from "./stores/AuthContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter basename="">
			<AuthProvider>
				<App />
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);
