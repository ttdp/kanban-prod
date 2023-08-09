export async function getProjects() {
    const res = await fetch("http://localhost:3333/projects")
    if (!res.ok) throw new Error("Bad Request")
    return res.json()
}

export const PROJECTS_PATH = "http://localhost:3333/projects"
export const PRIMARY_PROJECT_PATH = "http://localhost:3333/projectArr/8977130a-585f-4331-8bb6-15f65981a56b"