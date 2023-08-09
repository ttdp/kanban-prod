import { useState, useEffect } from "react"
import { PRIMARY_PROJECT_PATH, PROJECTS_PATH } from "../apis/api"

type ProjectResponse = {
    id: string
    name: string
};

type ServerError = {
    msg: string
    code: string
}

export default function LeftPane() {

    const [projects, setProjects] = useState<ProjectResponse[] | null>(null)
    const [loading, setLoading] = useState(false);

    const [project, setProject] = useState<Project|null>(null)

    useEffect(() => {
        fetch(PRIMARY_PROJECT_PATH)
            .then(async (res) => {
                const json = await res.json()
                const errors: ServerError[] = json["errors"]
                const project: Project = json["data"]
                if (errors.length !== 0) {
                    setError(errors[0]["msg"])
                } else {
                    setProject(project);
                    console.log(project)
                }
            })
    }, [])

    useEffect(() => {
        setLoading(true)

        fetch(PROJECTS_PATH)
            .then(async (res) => {
                const json = await res.json();
                const errors: ServerError[] = json["errors"]
                const projects: ProjectResponse[] = json["data"]
                if (errors.length !== 0) {
                    setError(errors[0]["msg"])
                } else {
                    setProjects(projects);
                }
            })
            .catch((e) => {
                if (e instanceof Error) setError(e.message)
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const loadingComponent = <div>Loading...</div>;

    return (
        <div className="basis-1/6 bg-slate-200">
            <aside className="">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        {
                            loading ? loadingComponent :
                                projects?.map((project, index) => (
                                    <li key={index}>
                                        <span className="text-white">{project.name}</span>
                                    </li>
                                ))
                        }
                    </ul>
                </div>
            </aside>
        </div>

    )
}
