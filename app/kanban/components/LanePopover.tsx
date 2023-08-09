import { useState } from "react"
import { LaneStatus } from './Lane'
import { useOutsideClick } from "../hooks/useOutsideClick"

export default function LanePopover({ lane, updateLane, deleteLane, laneStatus, updateLaneStatus }: 
    { lane: Lane, updateLane: (lane: Lane) => void, deleteLane: (lane: Lane) => void, laneStatus: LaneStatus, updateLaneStatus: (laneStatus: LaneStatus) => void }) {

    const [open, setOpen] = useState(false)

    const popoverRef = useOutsideClick(() => {
        setOpen(false)
    });

    const addTaskHandler = () => {
        setOpen(!open)
        updateLaneStatus({ ...laneStatus, addingTask: true })
    }

    const editNameHandler = () => {
        setOpen(!open)
        updateLaneStatus({ ...laneStatus, editingName: true })
    }

    const editStatusHandler = () => {
        setOpen(!open)
        updateLaneStatus({ ...laneStatus, editingStatus: true })
    }

    const deleteLaneHandler = () => {
        setOpen(!open)
        deleteLane(lane)
    }

    const options = [
        { id: 0, title: 'New Task', action: addTaskHandler },
        { id: 1, title: 'Edit Name', action: editNameHandler },
        { id: 2, title: 'Edit Status', action: editStatusHandler },
        { id: 3, title: 'Delete Lane', action: deleteLaneHandler }
    ]

    const handleClick = () => {
        setOpen(!open)
    }

    return (
        <div ref={popoverRef} className="relative">
            <button className="transition-colors" onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
            {open &&
                <ul className="bg-sky-400 absolute shadow-lg left-0 overflow-hidden">
                    {options.map((option) => (
                        <li className="px-4 py-2 w-32 hover:bg-sky-500" key={option.id}><button onClick={option.action}>{option.title}</button></li>
                    ))}
                </ul>
            }
        </div>
    )
}
