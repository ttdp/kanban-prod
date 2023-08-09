import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"
import { CardStatus } from "./Card"

// SubItem for CURRENT STATUS which has been created in this lane
export default function SubItemForCS({ subtask, task, status, updateTask, cardStatus, updateCardStatus }: {
    subtask: Subtask,
    task: Task, status: string[],
    updateTask: (task: Task) => void,
    cardStatus: CardStatus,
    updateCardStatus: (status: CardStatus) => void
}) {

    const index = task.subtasks.indexOf(subtask)

    const onDragEndHandler = (results: DropResult) => {
        const { source, destination } = results

        if (!destination) return
        if (destination.droppableId === source.droppableId && destination.index === source.index) return

        const _subtask = subtask
        _subtask.status = destination.index
        const _subtasks = [...task.subtasks]
        _subtasks[index] = _subtask

        task.subtasks = _subtasks
        updateTask(task)
    }

    const statusSaveHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        const status = parseInt(event.currentTarget.id)
        const _subtask = subtask
        _subtask.status = status
        task.subtasks[index] = _subtask
        updateTask(task)
    }

    const subtaskInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const subtitle = event.target.value
        const _subtask = subtask
        _subtask.subtitle = subtitle
        task.subtasks[index] = _subtask
        updateTask(task)
    }

    const subtaskEnterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') subtaskSaveHandler()
        if (event.key === 'Escape') subtaskCancelHandler()
    }

    const subtaskDeleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        const _subtasks = task.subtasks
        _subtasks.splice(index, 1)

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
                <input id={index.toString()} value={subtask.subtitle}
                    className="text-black w-full"
                    onChange={subtaskInputHandler}
                    onKeyDown={subtaskEnterHandler} >
                </input>
            </div>
            <div className="bg-white w-1/12 pt-1">
                <button id={index.toString()} onClick={subtaskDeleteHandler} className="transition-colors text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
        </div>

    const displayContent =
        status.length !== 0 ?
            // Draggable subtasks
            <div>
                <DragDropContext onDragEnd={onDragEndHandler}>
                    <Droppable droppableId={subtask.id} type={subtask.id} direction="horizontal">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}
                                className="bg-white flex">
                                {status.map((_, statusIndex) => (
                                    <Draggable draggableId={statusIndex.toString()} key={statusIndex.toString()} index={statusIndex}
                                        isDragDisabled={subtask.status !== statusIndex}>
                                        {(provided) => (
                                            <div {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                                ref={provided.innerRef}
                                                className="h-20 w-full">
                                                {subtask.status === statusIndex ?
                                                    <div className="bg-stone-200 h-full p-1 border-2 border-stone-300">
                                                        <h2 className="text-gray-800 ">{subtask.subtitle}</h2>
                                                    </div>
                                                    :
                                                    <div id={statusIndex.toString()}
                                                        className="bg-stone-100 w-full h-full"
                                                        onClick={statusSaveHandler}>
                                                    </div>
                                                }
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
            :
            // List subtasks
            <div>
                <div className="bg-stone-200 p-1 border-2 border-stone-300">
                    <h2 className="text-gray-800">{subtask.subtitle}</h2>
                </div>
            </div>

    return cardStatus.editingSubtask ? editingContent : displayContent
}