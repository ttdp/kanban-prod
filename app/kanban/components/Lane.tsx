import { useState } from "react"
import LanePopover from "./LanePopover"
import StatusBar from "./StatusBar"
import Queue from "./Queue"
import { Droppable } from "react-beautiful-dnd"
import { useOutsideClick } from "../hooks/useOutsideClick"

export interface LaneStatus {
    addingTask: boolean,
    editingName: boolean,
    editingStatus: boolean
}

const initStatus: LaneStatus = {
    addingTask: false,
    editingName: false,
    editingStatus: false
}

export default function Lane({ lane, updateLane, deleteLane }: { lane: Lane, updateLane: (lane: Lane) => void, deleteLane: (lane: Lane) => void }) {

    const [laneStatus, setLaneStatus] = useState<LaneStatus>(initStatus)

    const nameRef = useOutsideClick(() => {
        laneSaveHandler()
    });

    const updateLaneStatus = (newStatus: LaneStatus) => {
        setLaneStatus(newStatus)
    }

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        lane.name = event.target.value
    }

    const enterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') laneSaveHandler()
        if (event.key === "Escape") laneCancelHandler()
    }

    const editSaveHandler = () => {
        laneSaveHandler()
    }

    const laneSaveHandler = () => {
        updateLaneStatus({ ...laneStatus, editingName: false })
        updateLane(lane)
    }

    const laneCancelHandler = () => {
        updateLaneStatus({ ...laneStatus, editingName: false })
    }

    return (
        <div>
            <div className="bg-sky-600 mx-2 flex">
                {
                    laneStatus.editingName ?
                        <div ref={nameRef} className="bg-sky-600 pt-2 pr-2 w-11/12 h-10">
                            <input placeholder={lane.name} className="text-black w-full" onChange={inputHandler} onKeyDown={enterHandler} >
                            </input>
                        </div>
                        :
                        <div className="w-11/12 h-10 flex justify-center items-center">
                            <h1 className="text-lg w-full truncate">
                                {lane.name}
                            </h1>
                        </div>
                }
                <div className="pt-2 w-1/12">
                    {laneStatus.editingName ?
                        <div className="w-1/12">
                            <button onClick={editSaveHandler} className="transition-colors text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </button>
                        </div>
                        :
                        <LanePopover lane={lane} updateLane={updateLane} deleteLane={deleteLane} laneStatus={laneStatus} updateLaneStatus={updateLaneStatus} />
                    }
                </div>
            </div>

            <StatusBar lane={lane} updateLane={updateLane} laneStatus={laneStatus} updateLaneStatus={updateLaneStatus} />

            <Droppable droppableId={lane.id} type="lane">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="bg-green-100 w-full h-screen">
                        <Queue lane={lane} updateLane={updateLane} laneStatus={laneStatus} updateLaneStatus={updateLaneStatus} />
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}
