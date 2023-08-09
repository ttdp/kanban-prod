import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { CardStatus } from "./Card"
import { useOutsideClick } from "../hooks/useOutsideClick"
import SubItemForCS from "./SubItemForCS"
import SubItemForOS from "./SubItemForOS"

export default function SubCard({ task, lane, updateTask, cardStatus, updateCardStatus }:
    { task: Task, lane: Lane, updateTask: (task: Task) => void, cardStatus: CardStatus, updateCardStatus: (status: CardStatus) => void }) {

    const [newSubtitle, setNewSubtitle] = useState("")
    const [openOtherSubtasks, setOpenOtherSubtasks] = useState(false)
    const status = lane.status

    const subtasksForCS = task.subtasks.filter(subtask => subtask.laneId === lane.id)
    const subtasksForOS = task.subtasks.filter(subtask => subtask.laneId !== lane.id)

    useEffect(() => {
        reoderSubtasks()
    }, [])

    const reoderSubtasks = () => {
        const _subtasks = [...subtasksForCS, ...subtasksForOS]
        task.subtasks = _subtasks
        updateTask(task)
    }

    const newSubtaskRef = useOutsideClick(() => {
        newSubtaskSaveHandler()
    });

    const subtasksRef = useOutsideClick(() => {
        updateCardStatus({ ...cardStatus, editingSubtask: false })
    });

    const newSubtaskInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewSubtitle(event.target.value)
    }

    const newSubtaskEnterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') newSubtaskSaveHandler()
        if (event.key === 'Escape') newSubtaskCancelHandler()
    }

    const newSubtaskSaveHandler = () => {
        if (newSubtitle === "") {
            updateCardStatus({ ...cardStatus, addingSubtask: false })
            return
        }

        const subtask: Subtask = {
            id: uuidv4(),
            subtitle: newSubtitle,
            isDone: false,
            laneId: lane.id,
            taskId: task.id,
            status: 0
        }
        task.subtasks = [...subtasksForCS, subtask, ...subtasksForOS]
        setNewSubtitle("")
        updateCardStatus({ ...cardStatus, addingSubtask: false })
        updateTask(task)
    }

    const newSubtaskCancelHandler = () => {
        updateCardStatus({ ...cardStatus, addingSubtask: false })
    }

    const otherSubtasksHandler = () => {
        setOpenOtherSubtasks(!openOtherSubtasks)
    }

    const isDisplayOtherSubtasks = openOtherSubtasks || cardStatus.editingSubtask

    const content =
        <div ref={subtasksRef} className="flex flex-col">
            {
                subtasksForCS.map((subtask) => (
                    <div>
                        <SubItemForCS key={subtask.id} subtask={subtask} task={task} status={status} updateTask={updateTask} cardStatus={cardStatus} updateCardStatus={updateCardStatus} />
                    </div>
                ))
            }

            {
                cardStatus.addingSubtask &&
                <div ref={newSubtaskRef} className="flex border-2 border-stone-300">
                    <div className="bg-white w-11/12 p-1">
                        <input placeholder="Subtask"
                            className="text-black w-full"
                            onChange={newSubtaskInputHandler}
                            onKeyDown={newSubtaskEnterHandler} >
                        </input>
                    </div>
                    <div className="bg-white w-1/12 pt-1">
                        <button onClick={newSubtaskSaveHandler} className="transition-colors text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            }

            {
                subtasksForOS.length !== 0 &&
                <div>
                    <div onClick={otherSubtasksHandler} className="flex">
                        <div className="bg-stone-300 w-11/12 px-2">
                            <h2 className="text-stone-600 text-sm pt-1">Other subtasks</h2>
                        </div>
                        <div className="bg-stone-300 pr-2 w-1/12">
                            <button className="transition-colors text-black">
                                {isDisplayOtherSubtasks ?
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                }
                            </button>
                        </div>
                    </div>
                    {isDisplayOtherSubtasks &&
                        <div className="bg-stone-300" >
                            {
                                subtasksForOS.map((subtask) => (
                                    <SubItemForOS key={subtask.id} subtask={subtask} task={task} updateTask={updateTask} cardStatus={cardStatus} updateCardStatus={updateCardStatus} />
                                ))
                            }

                        </div>
                    }
                </div>
            }
        </div >

    return content
}
