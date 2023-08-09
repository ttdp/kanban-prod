import React, { useContext } from 'react'
import { CardStatus } from "./Card"
import BoardContext from '../contexts/BoardContext'

// SubItem for OTHRT STATUS which has been created in other lanes
export default function SubItemForOS({ subtask, task, updateTask, cardStatus, updateCardStatus }: {
    subtask: Subtask,
    task: Task,
    updateTask: (task: Task) => void,
    cardStatus: CardStatus,
    updateCardStatus: (status: CardStatus) => void
}) {

    const { project } = useContext(BoardContext)
    const lanes = project!.lanes.filter(lane => lane.id === subtask.laneId)
    
    let statusForOS = ""
    if (lanes[0]) {
        const laneName = lanes[0].name
        const laneStatus = lanes[0].status[subtask.status]
        
        if (laneStatus) {
            statusForOS = laneName + " (" + laneStatus + ")"
        } else {
            statusForOS = laneName
        }
    }

    const subtaskInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const subtitle = event.target.value
        const _subtask = subtask
        const index = task.subtasks.indexOf(subtask)
        _subtask.subtitle = subtitle
        task.subtasks[index] = _subtask
        updateTask(task)
    }

    const subtaskEnterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') subtaskSaveHandler()
        if (event.key === 'Escape') subtaskCancelHandler()
    }

    const subtaskDeleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        const _subtasks = task.subtasks.filter(item => item.id !== subtask.id)

        task.subtasks = _subtasks
        
        updateTask(task)

        if (task.subtasks.length === 0) {
            updateCardStatus({ ...cardStatus, editingSubtask: false })
        }
    }

    const subtaskSaveHandler = () => {
        updateCardStatus({ ...cardStatus, editingSubtask: false })
    }

    const subtaskCancelHandler = () => {
        updateCardStatus({ ...cardStatus, editingSubtask: false })
    }

    const editingContent =
        <div className="flex">
            <div className="bg-white w-11/12 p-1">
                <input value={subtask.subtitle}
                    className="text-black w-full"
                    onChange={subtaskInputHandler}
                    onKeyDown={subtaskEnterHandler} >
                </input>
            </div>
            <div className="bg-white w-1/12 pt-1">
                <button onClick={subtaskDeleteHandler} className="transition-colors text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
        </div>

    const displayContent =
        // List subtasks
        <div>
            <div className="bg-stone-200 flex justify-between p-1 border-2 border-stone-300">
                <h2 className="text-gray-800">{subtask.subtitle}</h2>
                <span className="text-xs font-semibold inline-block py-1 px-2 rounded text-sky-600 bg-sky-200 last:mr-0 mr-1">{statusForOS}</span>
            </div>
        </div>

    return cardStatus.editingSubtask ? editingContent : displayContent
}
