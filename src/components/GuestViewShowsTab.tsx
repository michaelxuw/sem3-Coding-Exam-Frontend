import Button from "@/components/Button";
import newShow from "@/types/entities/newShow";
import React, {useEffect, useState} from "react";

interface GuestViewShowsTabProps {
    shows?: newShow[];
    showsGuest?: newShow[];
    tabCounter: boolean;
}

function GuestViewShowsTab(props: GuestViewShowsTabProps) {
    const [showsToDisplay, setShowsToDisplay] = useState<newShow[]>([]);
    const [textToDisplay, setTextToDisplay] = useState("");

    useEffect(() => {
        if(props.shows != undefined) {
            setShowsToDisplay(props.shows);
            setTextToDisplay("List of all Shows");
        };
        if(props.showsGuest != undefined) {
            setShowsToDisplay(props.showsGuest);
            setTextToDisplay("List of all Shows that you signed on");
        };
        return () => {};
    }, [props.tabCounter]);


    return (
        <>
            <h2 className="text-2xl font-bold">{textToDisplay}</h2>
        {
            showsToDisplay.map(show => {
                return (
                    <div className="flex flex-col rounded-md shadow-md items-center m-1 gap-8">
                        <div className="flex w-full flex-col border-rose-500 p-10 shadow-lg gap-5 bg-white rounded-lg">
                            <h3 className="">
                                ID: {show.id} | Name: {show.name} | Duration: {show.duration} | Location: {show.location} | Start Date: {show.startDate} | Start Time: {show.startTime}
                            </h3>
                        </div>
                    </div>
                );
            })
        }
    </>);
}

export default GuestViewShowsTab;