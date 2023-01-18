import React, {useState} from "react";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import UpdateShow from "@/pages/UpdateShow";
import useToggle from "@/hooks/useToggle";
import {useNavigate} from "react-router-dom";
import newShow from "@/types/entities/newShow";

interface FestivalItemProps {
	showItem: newShow;
	afterSubmit: () => void;
	deleteShow: (id: number) => void;
}

function FestivalItem({ showItem, afterSubmit, deleteShow}: FestivalItemProps) {
	const [data, setData] = useState<newShow>(showItem);
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
						ID: {data.id} | Name: {data.name} | Duration: {data.duration} | Location: {data.location} | Start Date: {data.startDate} | Start Time: {data.startTime}
					</h3>
					<div className={`w-1/6`}>
						<Button onClick={toggle}>Update Show</Button>
						<Modal isOpen={show} toggle={toggle}>
							<UpdateShow afterSubmit={afterSubmitUpdate} oldShowInfo={data}/>
						</Modal>
					</div>
					<div className={`w-1/6`}>
						<Button onClick={() => deleteShow(data.id)}>Delete Show</Button>
					</div>
				</div>
			</div>
		</>

	);
}

export default FestivalItem;
