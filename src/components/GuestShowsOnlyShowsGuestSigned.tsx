import React, {useState} from "react";
import newShow from "@/types/entities/newShow";


interface GuestShowsOnlyShowsGuestSignedProps {
    shows: newShow[];
}

function GuestShowsOnlyShowsGuestSigned({ shows }: GuestShowsOnlyShowsGuestSignedProps) {
    const [allShowsGuest, setAllShowsGuest] = useState<newShow[]>(shows);


    return (
        <>
            <div className="flex flex-col gap-6 h-full p-8">
                <div className="flex flex-col p-10 gap-5 justify-center bg-white rounded-lg">
                    <div className="h-">

                        <h2 className="text-2xl font-bold">List of all Shows that you signed on</h2>

                        {
                            allShowsGuest.map(show => {
                                return (
                                    <div className="flex flex-row p-2 shadow-lg gap-0 justify-center bg-white rounded-lg">
                                        <div className="flex w-full flex-col border-rose-500 p-10 shadow-lg gap-5 bg-white rounded-lg">
                                            <h3 className="">
                                                ID: {show.id} | Name: {show.name} | Duration: {show.duration} | Location: {show.location} | Start Date: {show.startDate} | Start Time: {show.startTime}
                                            </h3>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default GuestShowsOnlyShowsGuestSigned;
