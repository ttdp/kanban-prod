import { useState } from "react"
import { LaneStatus } from './Lane'

export default function StatusBar({ lane, updateLane, laneStatus, updateLaneStatus }:
     { lane: Lane, updateLane: (lane: Lane) => void, laneStatus: LaneStatus, updateLaneStatus: (laneStatus: LaneStatus) => void }) {

    const [status, setStatus] = useState(lane.status)

    const addHandler = () => {
        // Empty status add two at once
        status.length === 0 ? setStatus(["", ""]) : setStatus([...status, ""])
    }

    const saveHandler = () => {
        // Remove empty string
        const newStatus = status.filter(item => item)
        lane.status = newStatus

        // lane.tasks.forEach(task=>{
        //     task.subTasks.forEach(subTask=>{
        //         if (subTask.status >= status.length) subTask.status = 0
        //     })
        // })

        lane.tasks.flatMap(task => task.subtasks).filter(subtask => subtask.status >= status.length).forEach(subtask => subtask.status=0);

        setStatus(newStatus)
        updateLaneStatus({ ...laneStatus, editingStatus: false })
        updateLane(lane)
    }

    const deleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        const index = parseInt(event.currentTarget.id)
        const newStatus = [...status]
        newStatus.splice(index, 1)
        setStatus(newStatus)
    }

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const index = parseInt(event.target.id)
        status[index] = event.target.value
    }

    const enterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') saveHandler()
        if (event.key === 'Escape') cancelHandler()
    }

    const cancelHandler = () => {
        setStatus(lane.status)
        updateLaneStatus({ ...laneStatus, editingStatus: false })
    }

    const content =
        <div>
            {laneStatus.editingStatus ?
                // Editing status bar
                <div className="h-8 bg-sky-200 text-sky-800 flex items-center">
                    {status.map((title, index) => (
                        <div className="flex w-full text-center truncate">
                            <div>
                                <input id={index.toString()} placeholder={title} className="text-black w-full m-1" onChange={inputHandler} onKeyDown={enterHandler} />
                            </div>
                            <div>
                                <button id={index.toString()} onClick={deleteHandler} className="transition-colors text-white p-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="w-full text-center truncate">
                        <button onClick={addHandler} className="transition-colors text-white p-1" >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                        <button onClick={saveHandler} className="transition-colors text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </button>
                    </div>
                </div>
                :
                // Display lane's status
                status.length !== 0 &&
                <div className="h-8 bg-sky-200 text-sky-800 divide-x divide-sky-400 flex items-center">
                    {status.map((statu) => (
                        <div className="w-full text-center truncate">{statu}
                        </div>
                    ))}
                </div>
            }
        </div>

    return content
}
