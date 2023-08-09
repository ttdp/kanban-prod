import { useState } from "react"
import { CardStatus } from "./Card"
import { useOutsideClick } from "../hooks/useOutsideClick"

export default function CardPopover(
    { task, updateTask, deleteTask, cardStatus, updateCardStatus }:
        {
            task: Task,
            updateTask: (task: Task) => void,
            deleteTask: (task: Task) => void
            cardStatus: CardStatus,
            updateCardStatus: (status: CardStatus) => void
        }) {

    const [open, setOpen] = useState(false)

    const popoverRef = useOutsideClick(() => {
        setOpen(false)
    });

    const addSubtaskHandler = () => {
        setOpen(!open)
        updateCardStatus({ ...cardStatus, addingSubtask: true })
    }

    const editSubtaskHandler = () => {
        setOpen(!open)
        updateCardStatus({ ...cardStatus, editingSubtask: true })
    }

    const editTitleHandler = () => {
        setOpen(!open)
        updateCardStatus({ ...cardStatus, editingTitle: true })
    }

    const deleteTaskHandler = () => {
        setOpen(!open)
        deleteTask(task)
    }

    const optionsWithSubtask = [
        { id: 0, title: 'New Subtask', action: addSubtaskHandler },
        { id: 1, title: 'Edit Subtask', action: editSubtaskHandler },
        { id: 2, title: 'Edit Title', action: editTitleHandler },
        { id: 3, title: 'Delete Task', action: deleteTaskHandler }
    ]

    const optionsWithoutSubtask = [
        { id: 0, title: 'New Subtask', action: addSubtaskHandler },
        { id: 1, title: 'Edit Title', action: editTitleHandler },
        { id: 2, title: 'Delete Task', action: deleteTaskHandler }
    ]

    const handleClick = () => {
        setOpen(!open)
    }

    return (
        <div ref={popoverRef} className="relative">
            <button className="transition-colors text-black" onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
            {open &&
                <ul className="bg-stone-100 absolute shadow-lg left-0 overflow-hidden">
                    {
                        task.subtasks.length === 0 ?
                            optionsWithoutSubtask.map((option) => (
                                <li className="px-4 py-2 w-36 hover:bg-stone-200 text-gray-600" key={option.id}><button onClick={option.action}>{option.title}</button></li>
                            ))
                            :
                            optionsWithSubtask.map((option) => (
                                <li className="px-4 py-2 w-36 hover:bg-stone-200 text-gray-600" key={option.id}><button onClick={option.action}>{option.title}</button></li>
                            ))
                    }
                </ul>
            }
        </div>
    )
}
