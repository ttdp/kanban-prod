'use client';

import { createContext, useContext } from 'react';
import { v4 as uuidv4 } from "uuid"

const PROJECT_KEY = "PROJECT"

export function setItem(key: string, item: any) {
    localStorage.setItem(key, JSON.stringify(item))
}

export function getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
}

export function saveStore(project: Project) {
    // localStorage.setItem(PROJECT_KEY, JSON.stringify(project))
    setItem(PROJECT_KEY, project)
}

export function readStore(): Project {
    // const storeData = localStorage.getItem(PROJECT_KEY)
    const project = getItem<Project>(PROJECT_KEY)
    if (project !== null) {
        return project
    } else {
        return {
            id: uuidv4(),
            name: "blank",
            lanes: [],
            ownerId: uuidv4(),
            userIds: []
        }
    }
}

export type BoardContextProps = {
    project: Project,
    setProject: (project: Project) => void
}

const BoardContext = createContext<BoardContextProps>(
    {
        project: readStore(),
        setProject: (project) => saveStore(project)
    }
);

const useBoard = () => {
    const currentBoardContext = useContext(BoardContext)

    if (!currentBoardContext) {
        throw new Error("No board found!")
    }
    return currentBoardContext
}

export default BoardContext;