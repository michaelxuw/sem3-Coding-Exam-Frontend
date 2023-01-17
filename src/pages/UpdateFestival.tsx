import {FocusEvent, ChangeEvent, FormEvent, useState, useEffect, useRef} from "react";
import {useValidator} from "@/utils/validationHelper";
import { Link, useNavigate } from "react-router-dom";
import API from "@/api";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { useAuth } from "../hooks/AuthContext";
import newFestival, {initialNewFestivalWithID} from "@/types/entities/newFestival";
import NewFestival from "@/types/entities/newFestival";


interface updateFestivalProps {
	afterSubmit?: () => void;
	oldFestivalInfo: NewFestival;
}

const updateFestival = ({ afterSubmit, oldFestivalInfo }: updateFestivalProps) => {
	const { state } = useAuth();
	const dateTimeNow = new Date().toISOString().slice(0, new Date().toISOString().lastIndexOf(":"));
	const init = oldFestivalInfo;
	const [formData, setFormData] = useState(init);
	const formRef = useRef<HTMLFormElement>(null);
	const navigate = useNavigate();
	const [alert, setAlert] = useState("");
	const {validationState, isOk, doValidation, getErrorMsg} = useValidator([
		// {
		// 	expression: formData.firstname.trim().length == 0,
		// 	inputName: "firstname",
		// 	msg: "This field is required",
		// },
	]);

	async function fillFormWithOldData() {
		const info = oldFestivalInfo as any;
		let form = formRef.current?.getElementsByTagName("input")!;
		for (const key in info) {
			// console.log(key)
			if(key == "id" || key == "guestIDs") continue
			let input = form.namedItem(key) as HTMLInputElement;
			input.value = info[key];
		}
	}
	useEffect(() => {
		fillFormWithOldData();
	}, []);


	const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.type == 'number') {
			setFormData((curr: any) => ({ ...curr, [e.target.name]: [...curr[e.target.name], Number.parseInt(e.target.value) ] }));
		} else {
			setFormData((curr: any) => ({ ...curr, [e.target.name]: e.target.value }));
		}
	};

	const onSelect = async (e: ChangeEvent<HTMLSelectElement>) => {
		setFormData((curr: any) => ({ ...curr, [e.target.name]: e.target.value }));
	};

	const onReset = () => {
		setFormData(init);
		setAlert("");
		const inputs = document.querySelectorAll(`input`);
		inputs.forEach(input => (input.disabled = false));
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// doValidation();

		try {
			await API.festival.updateFestival(formData["id"], formData);
			console.log(afterSubmit)
			if (afterSubmit != undefined) {
				afterSubmit();
			}
		} catch (error: any) {
			const errMsgFull = await error.fullError;
		}
		onReset();
	};

	return (
		<div className="flex flex-col items-center gap-6 justify-center h-full">
			<div className="flex flex-col items-center p-10 shadow-lg gap-5 justify-center bg-white rounded-lg">
				<div className="h-">
					<h2 className="text-2xl font-bold">Update Festival with id: {formData["id"]}</h2>
					{alert.length > 0 && (
						<div className="w-full bg-red-400 text-white rounded-md p-2 px-3">
							{alert}
						</div>
					)}
					<h3 className="">Update the information about the Festival!</h3>
					<form
						name="updateFestival"
						noValidate
						onSubmit={onSubmit}
						className="flex flex-col justify-center items-center w-full gap-5"
						ref={formRef}
					>
						<div className="flex flex-col w-full gap-5">
							<InputField
								onChange={onChange}
								type="text"
								label="Name of the festival"
								name="name"
								required
								errorMsg={getErrorMsg("name")}
							/>
							<InputField
								onChange={onChange}
								type="text"
								label="City where the festival takes place"
								name="city"
								required
								errorMsg={getErrorMsg("city")}
							/>
							<div className="flex flex-col justify-center items-start gap-1 flex-grow">
								<InputField
									className="disabled:border-b-primary-100 transition-all duration-300 ease-in-out bg-off-white outline-none border-b-2 border-b-primary-500 focus:border-b-secondary-500 border-b-solid rounded-lg px-4 py-2 w-full"
									onChange={onChange}
									type="date"
									label="Select the start date of festival"
									name="startDate"
									//hack fra nettet til at sætte tiden til nu
									min={dateTimeNow}
									required
									errorMsg={getErrorMsg("startDate")}
								/>
							</div>
							<InputField
								onChange={onChange}
								type="text"
								label="Duration of festival (format: XXX Hours (X.XX Days))"
								name="duration"
								required
								errorMsg={getErrorMsg("duration")}
							/>
							<InputField
								onChange={onChange}
								type="number"
								label="Add a guest to the Festival (input guest ID)"
								name="guestIDs"
								required
								errorMsg={getErrorMsg("guestIDs")}
							/>

						</div>
						<div className="flex w-3/4 gap-5 pt-2">
							<Button
								onClick={onReset}
								className="hover:bg-primary-500 hover:text-white"
								type="reset"
								outline
							>
								Reset
							</Button>
							<Button type="submit">Update</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default updateFestival;
