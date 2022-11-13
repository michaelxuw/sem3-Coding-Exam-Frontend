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
		<div className="flex flex-col justify-center items-center gap-3">
			<h2 className="text-2xl font-extrabold">Get images from apis that returns JSON with url to an image</h2>
			<Dropdown title="Image" options={imageUrls}/>
			<div className="flex flex-col justify-center items-center gap-3">
				<Button onClick={onClick}/>
			</div>
			{!data ? (
				<LoadingSpinner />
			) : (
				<img className="rounded-lg" height={"100px"} width={"200px"} src={data} />
			)}
		</div>
	);
}

export default ImagesFromApisPage;
