import React, { useEffect, useMemo, useState } from "react";
import API from "@/api";
import newShow from "@/types/entities/newShow";
import Button from "@/components/Button";
import useToggle from "@/hooks/useToggle";
import Modal from "@/components/Modal";
import CreateShow from "@/pages/CreateShow";
import {useNavigate} from "react-router-dom";
import ShowItem from "@/components/ShowItem";

function AdminShows() {
	const [shows, setShows] = useState<newShow[]>([]);
	const [show, toggle] = useToggle({});
	const navigate = useNavigate();
	const [refresh, toggleRefresh] = useState(false);

	const load = async () => {
		const data = await API.show.fetchAllShows();
		setShows(data);
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
	const deleteShow = async (id: number) => {
		await API.show.deleteShow(id);
		toggleRefresh((curr) => !curr);
	};

	return (
		<div className="flex flex-col gap-6 h-full p-8">
			<div className="flex flex-col p-10 gap-5 justify-center bg-white rounded-lg">
				<div className="h-">

					<div className={`w-1/6`}>
						<Button onClick={toggle}>Create a Show</Button>
						<Modal isOpen={show} toggle={toggle}>
							<CreateShow afterSubmit={afterSubmitCreate}/>
						</Modal>
					</div>

					<br/><br/>

					<h2 className="text-2xl font-bold">List of Shows</h2>
					<h3 className="">
						Here's the list of all Festivals
					</h3>
					<>
						{
							shows.map(showw => {
								return <ShowItem showItem={showw} afterSubmit={afterSubmitUpdate} deleteShow={deleteShow} />
							})
						}
					</>
				</div>
			</div>
		</div>
	);
}

export default AdminShows;
