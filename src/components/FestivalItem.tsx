import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import newFestival from "@/types/entities/newFestival";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import UpdateFestival from "@/pages/UpdateFestival";
import useToggle from "@/hooks/useToggle";
import API from "@/api";
import {useNavigate} from "react-router-dom";

interface FestivalItemProps {
	festival: newFestival;
	afterSubmit: () => void;
	deleteFestival: (id: number) => void;
}

function FestivalItem({ festival, afterSubmit, deleteFestival}: FestivalItemProps) {
	const [data, setData] = useState<newFestival>(festival);
	const [show, toggle] = useToggle({});
	const navigate = useNavigate();

	const afterSubmitUpdate = () => {
		toggle();
		navigate("/adminFestivals");
		afterSubmit();
	}

	return (
		<>
			<div className="flex flex-row p-2 shadow-lg gap-0 justify-center bg-white rounded-lg">
				<div className="flex w-full flex-row border-rose-500 p-10 shadow-lg gap-5 bg-white rounded-lg">
					<h3 className="">
						ID: {data.id} | Name: {data.name} | City: {data.city} | Start Date: {data.startDate} | Duration: {data.duration}
					</h3>
					<div className={`w-1/6`}>
						<Button onClick={toggle}>Update Festival</Button>
						<Modal isOpen={show} toggle={toggle}>
							<UpdateFestival afterSubmit={afterSubmitUpdate} oldFestivalInfo={data}/>
						</Modal>
					</div>
					<div className={`w-1/6`}>
						<Button onClick={() => deleteFestival(data.id)}>Delete Festival</Button>
					</div>
				</div>
			</div>
		</>

	);
}

export default FestivalItem;
