type Project = {
    id: string,
    name: string,
    lanes: Lane[],
    ownerId: string,
    userIds: string[]
}

type Lane = {
    id: string,
    name: string,
    status: string[],
    tasks: Task[]
}

type Task = {
    id: string,
    title: string,
    subtasks: Subtask[]
}

type Subtask = {
    id: string,
    subtitle: string,
    isDone: boolean,
    laneId: string,
    taskId: string,
    status: number
}

type User = {
    id: string,
    email: string
    avatar: string
    username: string,
    lastName: string,
    firstName: string,
}