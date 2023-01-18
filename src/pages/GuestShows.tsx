import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import { useAuth } from "../hooks/AuthContext.js";
import { Link, useNavigate } from "react-router-dom";
import Tabs from "@/components/Tabs.js";
import GuestShowsAllShows from "@/components/GuestShowsAllShows.js";
import GuestShowsOnlyShowsGuestSigned from "../components/GuestShowsOnlyShowsGuestSigned";
import newShow from "@/types/entities/newShow";
import API from "@/api";
import GuestViewShowsTab from "@/components/GuestViewShowsTab";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import CreateFestival from "@/pages/CreateFestival";
import InputField from "@/components/InputField";

interface GuestShowsProps {
	setErrorMsg?: () => void;
}

function GuestShows({ setErrorMsg }: GuestShowsProps) {
	const { state: authState } = useAuth();
	const [shows, setShows] = useState<newShow[]>([]);
	const [showsGuest, setShowsGuest] = useState<newShow[]>([]);
	const [tabCounter, setTabCounter] = useState(false);
	const [showID, setShowID] = useState(0);

	const loadAllShows = async () => {
		const data1 = await API.show.fetchAllShows();
		setShows(data1);
	};
	const loadShowsGuestSigned = async () => {
		const data2 = await API.show.fetchAllShowsForGuestWithID(parseInt(authState.ID));
		setShowsGuest(data2);
	};
	useEffect(() => {
		loadShowsGuestSigned();
		loadAllShows();
	}, []);

	const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
		setShowID(parseInt(e.target.value));
	};
	const onReset = () => {
		setShowID(0);
		const inputs = document.querySelectorAll(`input`);
		inputs.forEach(input => (input.disabled = false));
	};
	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await API.show.signUpToShow(showID, parseInt(authState.ID));
		} catch (error: any) {
			const errMsgFull = await error.fullError;
			console.log(errMsgFull.message);
		}
		onReset();
	};

	return (
		<div className="flex flex-col items-center gap-6 justify-center h-full">

			<div className={`w-1/6`}>
				<form
					name="createFestival"
					noValidate
					onSubmit={onSubmit}
					className="flex flex-col justify-center items-center w-full gap-5"
				>
					<div className="flex flex-col w-full gap-5">
						<InputField
							onChange={onChange}
							type="number"
							label="ID of show (refresh page after clicking 'Sign up')"
							name="id"
							required
						/>

					</div>
					<div className="flex w-3/4 gap-5 pt-2">
						<Button type="submit">Sign up</Button>
					</div>
				</form>
			</div>

			<h2 className="text-2xl font-bold">(This works, but both tabs have to be clicked first)</h2>

			<Tabs
				tabs={[
					{
						name: "All shows",
						content: GuestViewShowsTab({shows, tabCounter}),
					},
					{
						name: "All shows guest has signed",
						content: GuestViewShowsTab({showsGuest, tabCounter}),
					},
				]}
				tabCounter={tabCounter}
				setTabCounter={setTabCounter}
			/>
		</div>
	);
}

export default GuestShows;
