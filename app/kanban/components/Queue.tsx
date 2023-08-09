import { useState } from 'react'
import Card from './Card'
import { LaneStatus } from './Lane'
import { v4 as uuidv4 } from "uuid"
import { useOutsideClick } from "../hooks/useOutsideClick"

export default function Queue({ lane, updateLane, laneStatus, updateLaneStatus }:
    {
        lane: Lane, updateLane: (lane: Lane) => void,
        laneStatus: LaneStatus, updateLaneStatus: (laneStatus: LaneStatus) => void
    }) {

    const tasks: Task[] = lane.tasks

    const [title, setTitle] = useState("")

    const newTaskRef = useOutsideClick(() => {
        taskSaveHandler()
    });

    const titleInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const titleEnterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') taskSaveHandler()
        if (event.key === 'Escape') taskCancelHandler()
    }

    const taskSaveHandler = () => {
        const newTask: Task = {
            id: uuidv4(),
            title: title,
            subtasks: []
        }

        lane.tasks = [newTask, ...lane.tasks]
        
        setTitle("")
        updateLaneStatus({ ...laneStatus, addingTask: false })
        updateLane(lane)
    }

    const taskCancelHandler = () => {
        updateLaneStatus({ ...laneStatus, addingTask: false })
    }

    const updateTask = (task: Task) => {
        let index = tasks.findIndex(obj => obj.id === task.id)
        lane.tasks.splice(index, 1)
        lane.tasks.splice(index, 0, task)
        updateLane(lane)
    }

    const deleteTask = (task: Task) => {
        let index = tasks.findIndex(obj => obj.id === task.id)
        lane.tasks.splice(index, 1)
        updateLane(lane)
    }

    const content =
        <div>
            {
                laneStatus.addingTask &&
                <div ref={newTaskRef} className='bg-yellow-100 p-2 mb-2 flex'>
                    <div className='bg-white p-2 w-11/12'>
                        <input value={title} className="text-black w-full" onChange={titleInputHandler} onKeyDown={titleEnterHandler} >
                        </input>
                    </div>
                    <div className="bg-white pt-2 w-1/12">
                        <button onClick={taskSaveHandler} className="transition-colors text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            }
            <div>
                {tasks.map((task, index) => (
                    <Card key={index} task={task} index={index} lane={lane} updateTask={updateTask} deleteTask={deleteTask} />
                ))}
            </div>
        </div>


    return content
}
