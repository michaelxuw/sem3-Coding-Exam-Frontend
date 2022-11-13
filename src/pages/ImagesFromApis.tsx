import React, { useEffect, useMemo, useState } from "react";
import facade from "../api/apiFacade";
import LoadingSpinner from "../components/LoadingSpinner";
import Dropdown from "../components/Dropdown";
import {imageApiOptions} from "../stores/ImageAPIDropdownList";
import {DropdownOptionBasics} from "../stores/DropdownListItemTemplate";
import Button from "../components/Button";

function ImagesFromApisPage() {
	const [data, setData] = useState<string>();
	const [imageUrls, setImageUrls] = useState<DropdownOptionBasics[]>(imageApiOptions);

	const onClick = async () => {
		const apiUrl = imageUrls.find(item => {return item.selected})
		if (apiUrl !== undefined) {
			const newData = await facade.fetchImageFromApiURL(apiUrl.key);
			if (newData) setData(newData);
		}
	}

	return (
		<>
			<div className="container flex items-center gap-3 m-2">
				<div className="flex w-1/2 float-left justify-center items-center gap-3 m-2">
					<h2 className="text-2xl font-extrabold">Get images from apis that returns JSON with url to an image</h2>
				</div>
				<div className="flex mt-2 gap-3">
					<Dropdown title="Image" options={imageUrls} className="w-max w-[350px] relative"/>
					<Button onClick={onClick} children="Get image" className="w-max"/>
				</div>
			</div>
			<div className="flex m-2 float-right justify-center w-1/2">
				{!data ? (
					<LoadingSpinner />
				) : (
					<img className="rounded-lg" height={"300px"} width={"300px"} src={data} />
				)}
			</div>
		</>
	);
}

export default ImagesFromApisPage;
