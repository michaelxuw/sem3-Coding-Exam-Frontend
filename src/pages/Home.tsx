import React from "react";
import {locationOptions} from "../stores/DropdownListItemTemplate";
import Dropdown from "../components/Dropdown";
import Button from "../components/Button";

function Home() {
	let locations = locationOptions;
	const logOnClick = () => {
		locations.forEach((location) => {
			console.log(location)})
	}

	return <div>
		HOME


		<br/><br/><br/><br/><br/>
		<Button onClick={logOnClick}/>
		<p>locationOptions</p>
		<Dropdown title="Select location" options={locations}/>
		<br/><br/>
		<p>locationOptions multi</p>
		<Dropdown title="Select locations" isMulti={true} titleHelper="location"
				  titleHelperPlural="locations" options={locations}/>
		<br/><br/>


	</div>;
}

export default Home;
