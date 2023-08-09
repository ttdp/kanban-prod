import React, { useState, useContext } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import CardPopover from './CardPopover'
import SubCard from './SubCard'
import { useOutsideClick } from "../hooks/useOutsideClick"

export interface CardStatus {
    addingSubtask: boolean,
    editingSubtask: boolean,
    editingTitle: boolean
}

const initStatus: CardStatus = {
    addingSubtask: false,
    editingSubtask: false,
    editingTitle: false
}

export default function Card({ task, index, lane, updateTask, deleteTask }: 
    { task: Task, index: number, lane: Lane, updateTask: (task: Task) => void, deleteTask: (task: Task) => void }) {

    const [cardStatus, setCardStatus] = useState<CardStatus>(initStatus)

    const titleRef = useOutsideClick(() => {
        titleSaveHandler()
    });

    const updateCardStatus = (newStatus: CardStatus) => {
        setCardStatus(newStatus)
    }

    const titleInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        task.title = event.target.value
        updateTask(task)
    }

    const titleEnterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') titleSaveHandler()
        if (event.key === 'Escape') titleCancelHandler()
    }

    const titleSaveHandler = () => {
        setCardStatus({...cardStatus, editingTitle: false})
        updateTask(task)
    }

    const titleCancelHandler = () => {
        setCardStatus({...cardStatus, editingTitle: false})
    }

    const content =
        <Draggable draggableId={task.id} key={task.id} index={index} >
            {(provided) => (
                <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef} className='bg-yellow-100 p-2 mb-2'>
                    {cardStatus.editingTitle ?
                        <div className='flex'>
                            <div ref={titleRef} className='bg-white p-2 w-11/12'>
                                <input value={task.title} className="text-black w-full" onChange={titleInputHandler} onKeyDown={titleEnterHandler} >
                                </input>
                            </div>
                            <div className="bg-white pt-2 w-1/12">
                                <button onClick={titleSaveHandler} className="transition-colors text-black">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        :
                        <div className='flex'>
                            <div className='bg-stone-300 p-2 w-11/12'>
                                <h1 className='text-black text-lg font'>{task.title}</h1>
                            </div>
                            <div className="bg-stone-300 pt-2 w-1/12">
                                <CardPopover task={task} updateTask={updateTask} deleteTask={deleteTask} cardStatus={cardStatus} updateCardStatus={updateCardStatus} />
                            </div>
                        </div>
                    }
                    <SubCard task={task} lane={lane} updateTask={updateTask} cardStatus={cardStatus} updateCardStatus={updateCardStatus} />
                </div>
            )}
        </Draggable>

    return content
}
