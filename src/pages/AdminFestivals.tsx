import React, { useEffect, useMemo, useState } from "react";
import API from "@/api";
import newFestival from "@/types/entities/newFestival";
import Button from "@/components/Button";
import useToggle from "@/hooks/useToggle";
import Modal from "@/components/Modal";
import CreateFestival from "@/pages/CreateFestival";
import UpdateFestival from "@/pages/UpdateFestival";
import FestivalItem from "@/components/FestivalItem";
import {useNavigate} from "react-router-dom";

function AdminFestivals() {
	const [festivals, setFestivals] = useState<newFestival[]>([]);
	const [show, toggle] = useToggle({});
	const navigate = useNavigate();
	const [refresh, toggleRefresh] = useState(false);

	const load = async () => {
		const data = await API.festival.fetchFestivals();
		setFestivals(data);
	};
	useEffect(() => {
		load();
	}, [refresh]);

	const afterSubmitCreate = () => {
		toggle();
		toggleRefresh((curr) => !curr);
	}
	const afterSubmitUpdate = () => {
		toggleRefresh((curr) => !curr);
	}
	const deleteFestival = async (id: number) => {
		await API.festival.deleteFestival(id);
		toggleRefresh((curr) => !curr);
	};

	return (
		<div className="flex flex-col gap-6 h-full p-8">
			<div className="flex flex-col p-10 gap-5 justify-center bg-white rounded-lg">
				<div className="h-">

					<div className={`w-1/6`}>
						<Button onClick={toggle}>Create a Festival</Button>
						<Modal isOpen={show} toggle={toggle}>
							<CreateFestival afterSubmit={afterSubmitCreate}/>
						</Modal>
					</div>

					<br/><br/>

					<h2 className="text-2xl font-bold">List of Festivals</h2>
					<h3 className="">
						Here's the list of all Festivals
					</h3>
					<>
						{
							festivals.map(festival => {
								return <FestivalItem festival={festival} afterSubmit={afterSubmitUpdate} deleteFestival={deleteFestival} />

								// let id = festival.id;
								// return (
								// 	<div className="flex flex-row p-2 shadow-lg gap-0 justify-center bg-white rounded-lg">
								// 		<div className="flex w-full flex-row border-rose-500 p-10 shadow-lg gap-5 bg-white rounded-lg">
								// 			<h3 className="">
								// 				ID: {festival.id} | Name: {festival.name} | City: {festival.city} | Start Date: {festival.startDate} | Duration: {festival.duration}
								// 			</h3>
								// 			<div className={`w-1/6`}>
								// 				<Button onClick={toggle}>Update Festival</Button>
								// 				<Modal isOpen={show} toggle={toggle}>
								// 					<UpdateFestival afterSubmit={afterSubmit} oldFestivalInfo={festival}/>
								// 				</Modal>
								// 			</div>
								// 			<div className={`w-1/6`}>
								// 				<Button onClick={() => deleteFestival(id)}>Delete Festival</Button>
								// 			</div>
								// 		</div>
								// 	</div>
								// );
							})
						}
					</>

				</div>
			</div>
		</div>
	);
}

export default AdminFestivals;
