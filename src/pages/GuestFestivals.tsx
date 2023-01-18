import React, { useEffect, useMemo, useState } from "react";
import API from "@/api";
import newFestival from "@/types/entities/newFestival";

function GuestFestivals() {
	const [festivals, setFestivals] = useState<newFestival[]>([]);

	const load = async () => {
		const data = await API.festival.fetchRelevantFestivals();
		setFestivals(data);
	};
	useEffect(() => {
		load();
	}, []);


	return (
		<div className="flex flex-col gap-6 h-full p-8">
			<div className="flex flex-col p-10 gap-5 justify-center bg-white rounded-lg">
				<div className="h-">

					<h2 className="text-2xl font-bold">List of upcoming Festivals</h2>
					<h3 className="">
						Here's the list of all upcoming Festivals
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

export default GuestFestivals;
