import React, { useEffect, useMemo, useState } from "react";
import API from "@/api";
import newFestival from "@/types/entities/newFestival";
import Button from "@/components/Button";
import useToggle from "@/hooks/useToggle";
import Modal from "@/components/Modal";
import CreateFestival from "@/pages/CreateFestival";

function AdminFestivals() {
	const [festivals, setFestivals] = useState<newFestival[]>([]);
	const [show, toggle] = useToggle({});

	const load = async () => {
		const data = await API.festival.fetchFestivals();
		setFestivals(data);
	};
	useEffect(() => {
		load();
	}, []);

	const afterSubmit = () => {
		toggle();
		load();
	}

	return (
		<div className="flex flex-col gap-6 h-full p-8">
			<div className="flex flex-col p-10 gap-5 justify-center bg-white rounded-lg">
				<div className="h-">

					<div className={`w-1/6`}>
						<Button onClick={toggle}>Create a Festival</Button>
						<Modal isOpen={show} toggle={toggle}>
							<CreateFestival afterSubmit={afterSubmit}/>
						</Modal>
					</div>

					<br/><br/>

					<h2 className="text-2xl font-bold">List of Festivals</h2>
					<h3 className="">
						Here's the list of all Festivals
					</h3>

					{
						festivals.map(festival => {
							return (
								<div className="flex flex-row p-2 shadow-lg gap-0 justify-center bg-white rounded-lg">
									<div className="flex w-full flex-col border-rose-500 p-10 shadow-lg gap-5 bg-white rounded-lg">
										<h3 className="">
											ID: {festival.id} | Name: {festival.name} | City: {festival.city} | Start Date: {festival.startDate} | Duration: {festival.duration}
										</h3>
									</div>
								</div>
							);
						})
					}
				</div>
			</div>
		</div>
	);
}

export default AdminFestivals;
