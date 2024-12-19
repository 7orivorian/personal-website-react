import "./project-form.scss";
import {ProjectData} from "../../../scripts/types.ts";
import {useUser} from "../../../contexts/UserContext.tsx";
import {useEffect, useState} from "react";
import {useData} from "../../../contexts/DataContext.tsx";

export default function ProjectDeleteForm({projects}: {
    projects: ProjectData[];
}) {

    const {fetchWithAuth} = useUser();
    const {deleteProject} = useData();

    const [querySlug, setQuerySlug] = useState<string>("");
    const [project, setProject] = useState<ProjectData | undefined>(undefined);

    useEffect(() => {
        setProject(projects.find((project: ProjectData): boolean => project.slug === querySlug));
    }, [projects, querySlug])

    const handleSubmit = (e: any): void => {
        e.preventDefault();
        if (!project) {
            return;
        }
        const slug: string = project.slug;
        fetchWithAuth(`projects/delete/slug/${slug}`, {
            method: "DELETE"
        }).then(async res => {
            if (res.ok) {
                deleteProject(slug);
                setQuerySlug("");
            }
        }).catch(err => console.error(err));
    };

    return (
        <>
            <form className="project-form generic-form" onSubmit={handleSubmit}>
                <h1>Delete Project</h1>
                <div className="project-form__input-container input-container">
                    <label htmlFor="search">Search by Slug</label>
                    <input
                        id="search"
                        className="search-input"
                        type="search"
                        placeholder="Search projects by slug..."
                        value={querySlug}
                        onChange={e => setQuerySlug(e.target.value.trim().toLowerCase())}
                    />
                </div>
                {project ? (
                    <p>{project.name}</p>
                ) : (
                    querySlug && (
                        <p>No project with slug '{querySlug}'</p>
                    )
                )}
                <div className="project-form__input-container">
                    <label className="transparent" htmlFor="submit">Delete Project</label>
                    <input id="submit" type="submit" value="Delete Project" disabled={!project}/>
                </div>
            </form>
        </>
    );
}