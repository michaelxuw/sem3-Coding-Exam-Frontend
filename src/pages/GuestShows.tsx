import React, {useEffect, useState} from "react";
import { useAuth } from "../hooks/AuthContext.js";
import { Link, useNavigate } from "react-router-dom";
import Tabs from "@/components/Tabs.js";
import GuestShowsAllShows from "@/components/GuestShowsAllShows.js";
import GuestShowsOnlyShowsGuestSigned from "../components/GuestShowsOnlyShowsGuestSigned";
import newShow from "@/types/entities/newShow";
import API from "@/api";
import GuestViewShowsTab from "@/components/GuestViewShowsTab";

interface GuestShowsProps {
	setErrorMsg?: () => void;
}

function GuestShows({ setErrorMsg }: GuestShowsProps) {
	const { state: authState } = useAuth();
	const [shows, setShows] = useState<newShow[]>([]);
	const [showsGuest, setShowsGuest] = useState<newShow[]>([]);
	const [tabCounter, setTabCounter] = useState(false);

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

	return (
		<div className="flex flex-col items-center gap-6 justify-center h-full">

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
