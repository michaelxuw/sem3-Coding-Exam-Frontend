import React, {
	ChangeEvent,
	Dispatch,
	FormEvent,
	SetStateAction,
	useContext,
	useRef,
	useState,
} from "react";
import facade from "../api/apiFacade.js";
import AuthContext from "../stores/AuthContext.js";
import Button from "./Button.js";
import InputField from "./InputField.js";

interface LoginProps {
	setErrorMsg?: () => void;
}

function Login({ setErrorMsg }: LoginProps) {
	const init = { username: "", password: "" };
	const [loginCredentials, setLoginCredentials] = useState(init);
	const { setLoggedIn } = useContext(AuthContext);

	const performLogin = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		login(loginCredentials.username, loginCredentials.password);
	};

	const login = (user: string, pass: string) => {
		facade.login(user, pass).then(res => setLoggedIn && setLoggedIn(true));
	};

	const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setLoginCredentials({ ...loginCredentials, [evt.target.name]: evt.target.value });
	};

	return (
		<div>
			<form onSubmit={performLogin} className="flex justify-center p-2 items-center gap-2">
				<InputField
					onChange={onChange}
					type="text"
					placeholder="Username"
					name="username"
				/>{" "}
				<InputField
					onChange={onChange}
					type="password"
					placeholder="Password"
					name="password"
				/>
				<Button className="w-max" type="submit">
					Login
				</Button>
			</form>
		</div>
	);
}

export default Login;
