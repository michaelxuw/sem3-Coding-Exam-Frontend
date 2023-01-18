import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import { useAuth } from "../hooks/AuthContext";
import InputField from "@/components/InputField";
import {useValidator} from "@/utils/validationHelper";
import {initialNewAccount} from "@/types/entities/newAccount";
import API from "@/api";
import Button from "@/components/Button";

function Home() {
	const { state: authState } = useAuth();
	const [greeting, setGreeting] = useState("");
	const [formData, setFormData] = useState(initialNewAccount);
	const [alert, setAlert] = useState("");
	const { validationState, isOk, doValidation, getErrorMsg } = useValidator([
		{
			expression: () => formData.name.trim().length == 0,
			inputName: "firstname",
			msg: "This field is required",
		},
	]);

	useEffect(() => {
		const getGreeting = async () => {
			let newGreeting = "Welcome! \nFestival is all done";
			setGreeting(newGreeting);
		};
		getGreeting();
	}, [authState.loggedIn]);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		if(e.target.type == "radio") {
			var isTrue = (e.target.value === 'true')
			setFormData(curr => ({ ...curr, [e.target.name]: isTrue }));
		} else {
			setFormData(curr => ({ ...curr, [e.target.name]: e.target.value }));
		}
	};

	const onReset = () => {
		// setFormData(initialNewScoutAccount);
		setAlert("");
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// doValidation();

		if (isOk()) {
			console.log("below is the formdata to be sent")
			console.log(formData)
			const response = await API.account.createAccount(formData);
			onReset();
		}
	};

	return (
	<div>
		{greeting}
		<br/><br/><br/>


		<h2 className="text-2xl font-bold">Below is quicky messy coding for making accounts (User or Admin)</h2>
		<h2 className="text-2xl font-bold">Also has no feedback after clicking create</h2>
		<h2 className="text-2xl font-bold">Create an account:</h2>
		<form
			noValidate
			onSubmit={onSubmit}
			className="flex flex-col justify-center items-center w-full gap-5"
		>
			<div className="flex flex-col w-full gap-5">
				<InputField
					onChange={onChange}
					label="Click the radio button to make the account an Admin account (can't be unclicked, have to refresh page)"
					type="radio"
					name="isAdmin"
					value={'true'}
					required
				/>
				<InputField
					onChange={onChange}
					label="Enter Email"
					type="email"
					name="email"
					required
				/>
				<InputField
					onChange={onChange}
					label="Enter Password"
					type="text"
					name="password"
					required
				/>
				<InputField
					onChange={onChange}
					label="Enter phone"
					type="text"
					name="phone"
					required
				/>
				<InputField
					onChange={onChange}
					label="Enter Name"
					type="text"
					name="name"
					required
				/>
				<InputField
					onChange={onChange}
					label="Re-enter password"
					type="text"
					name="comfirmPassword"
					required
				/>
			</div>
			<div className="flex w-3/4 gap-5 pt-2">
				<Button onClick={onReset} outline type="reset">
					Reset
				</Button>
				<Button type="submit">Create</Button>
			</div>
		</form>
	</div>
	);
}

export default Home;
