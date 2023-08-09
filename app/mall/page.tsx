'use client'

import { useState } from 'react';
import styles from './page.module.css'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Todo } from '@/models/todo';

const DATA = [
    {
        id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
        name: "Walmart",
        items: [
            { id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "3% Milk" },
            { id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525", name: "Butter" },
        ],
        tint: 1,
    },
    {
        id: "487f68b4-1746-438c-920e-d67b7df46247",
        name: "Indigo",
        items: [
            {
                id: "95ee6a5d-f927-4579-8c15-2b4eb86210ae",
                name: "Designing Data Intensive Applications",
            },
            { id: "5bee94eb-6bde-4411-b438-1c37fa6af364", name: "Atomic Habits" },
        ],
        tint: 2,
    },
    {
        id: "25daffdc-aae0-4d73-bd31-43f73101e7c0",
        name: "Lowes",
        items: [
            { id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc", name: "Workbench" },
            { id: "d3edf796-6449-4931-a777-ff66965a025b", name: "Hammer" },
        ],
        tint: 3,
    },
];

const Kanban = () => {
    const [stores, setStores] = useState(DATA)

    const handleDrapDrop = (results: DropResult) => {

        const { source, destination, type } = results

        if (!destination) return

        if (source.droppableId === destination.droppableId &&
            source.index === destination.index) return

        if (type === 'group') {
            const reorderedStores = [...stores]
            const sourceIndex = source.index
            const destinationIndex = destination.index
            const [removedStore] = reorderedStores.splice(sourceIndex, 1)
            reorderedStores.splice(destinationIndex, 0, removedStore)
            return setStores(reorderedStores)
        }

        const storeSourceIndex = stores.findIndex((store) => store.id === source.droppableId)
        const storeDestinationIndex = stores.findIndex((store) => store.id === destination.droppableId)
        const newSourceItems = [...stores[storeSourceIndex].items]
        const newDestinationItems = source.droppableId !== destination.droppableId ? [...stores[storeDestinationIndex].items] : newSourceItems
        const [deletedItem] = newSourceItems.splice(source.index, 1)
        newDestinationItems.splice(destination.index, 0, deletedItem)

        const newStores = [...stores]
        newStores[storeSourceIndex] = {
            ...stores[storeSourceIndex],
            items: newSourceItems
        }

        newStores[storeDestinationIndex] = {
            ...stores[storeDestinationIndex],
            items: newDestinationItems
        }

        setStores(newStores)
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <DragDropContext onDragEnd={handleDrapDrop}>
                    <div className={styles.header}>
                        <h1 className='text-xl bg-black'>Shopping List</h1>
                    </div>

                    <Droppable droppableId='Root' type="group">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {stores.map((store, index) => (
                                    <Draggable draggableId={store.id} key={store.id} index={index}>
                                        {(provided) => (
                                            <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                                <StoreList name={store.name} items={store.items as Array<{id: string, name: string}>} id={store.id} />
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
        </div>
    )
}

const StoreList = ({ name, items, id }: {name: string, items: Array<{id: string, name: string}>, id: string}) => {
    return (
        <Droppable droppableId={id}>
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    <div className={styles.store_container}>
                        <h3>{name}</h3>
                    </div>
                    <div className='items_container'>
                        {items.map((item: {id: string, name: string}, index: number) => (
                            <Draggable draggableId={item.id.toString()} index={index} key={item.id}>
                                {(provided) => (
                                    <div className='item_container' {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                                        <h4 className='bg-slate-600'>
                                            {item.name}
                                        </h4>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

export default Kanban