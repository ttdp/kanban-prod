'use client'

import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"
import Lane from "./Lane"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { useEffect, useContext } from "react"
import BoardContext, { saveStore } from '../contexts/BoardContext'
// import { getProjects } from "../apis/api"

// https://codingwithmanny.medium.com/understanding-hydration-errors-in-nextjs-13-with-a-web3-wallet-connection-8155c340fbd5

export default function Board() {

    const { project, setProject } = useContext(BoardContext)

    const [lanes, setLanes] = useState(project.lanes)
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, [])

    useEffect(() => {
        saveStore(project)
    }, [project])

    // Render
    if (!hasMounted) return null;

    const updateLane = (lane: Lane) => {
        let index = lanes.findIndex(obj => obj.id === lane.id)
        const updatedLanes = [...lanes]
        updatedLanes.splice(index, 1)
        updatedLanes.splice(index, 0, lane)
        setLanes(updatedLanes)
        project.lanes = updatedLanes
        setProject({...project})
    }

    const deleteLane = (lane: Lane) => {
        let index = lanes.findIndex(obj => obj.id === lane.id)
        const updatedLanes = [...lanes]
        updatedLanes.splice(index, 1)
        setLanes(updatedLanes)
        project.lanes = updatedLanes
        setProject({...project})
    }

    const onDragEndHandler = (results: DropResult) => {
        const { source, destination, type } = results

        if (!destination) return
        if (destination.droppableId === source.droppableId && destination.index === source.index) return

        if (type === 'board') {
            const reorderLanes = [...lanes]
            const sourceIndex = source.index
            const destinationIndex = destination.index
            const [removedLane] = reorderLanes.splice(sourceIndex, 1)
            reorderLanes.splice(destinationIndex, 0, removedLane)
            setLanes(reorderLanes)
            project.lanes = reorderLanes
            setProject({...project})
            return
        }

        const laneSourceIndex = lanes.findIndex((lane) => lane.id === source.droppableId)
        const laneDestinationIndex = lanes.findIndex((lane) => lane.id === destination.droppableId)

        const newSourceTasks = [...lanes[laneSourceIndex].tasks]
        const newDestinationTasks = source.droppableId !== destination.droppableId ? [...lanes[laneDestinationIndex].tasks] : newSourceTasks

        const [deletedTask] = newSourceTasks.splice(source.index, 1)
        newDestinationTasks.splice(destination.index, 0, deletedTask)

        const newLanes = [...lanes]
        newLanes[laneSourceIndex] = {
            ...lanes[laneSourceIndex],
            tasks: newSourceTasks
        }

        newLanes[laneDestinationIndex] = {
            ...lanes[laneDestinationIndex],
            tasks: newDestinationTasks
        }

        setLanes(newLanes)
        project.lanes = newLanes
        setProject({...project})
    }

    const addLaneHandler = () => {
        const newLane = {
            id: uuidv4(),
            name: 'New Lane',
            status: [],
            tasks: []
        }

        const updatedLanes: Lane[] = [...lanes, newLane]
        setLanes(updatedLanes)
    }

    return (
        <>
            <div className="">
                <div className="p-2">Life is simple. You make choices and don't look back.</div>
                <div className="flex">
                    <div>
                        <DragDropContext onDragEnd={onDragEndHandler}>
                            <Droppable droppableId='Board' type="board" direction="horizontal">
                                {(provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef} className="bg-green-200 flex flex-nowrap">
                                        {lanes.map((lane, index) => (
                                            <Draggable draggableId={lane.id} key={lane.id} index={index}>
                                                {(provided) => (
                                                    <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef} className="bg-sky-600 w-80 ml-4">
                                                        <Lane lane={lane} updateLane={updateLane} deleteLane={deleteLane} />
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
                    <div className="bg-green-200">
                        <button className="bg-sky-600 hover:bg-sky-500 h-10 text-lg py-1 px-6 mx-4 rounded-full" onClick={addLaneHandler}>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
