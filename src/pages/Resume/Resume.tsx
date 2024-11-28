import "./resume.scss";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {fetchProjects, ProjectData} from "../../scripts/fetchers.ts";
import SearchBar from "../../components/SearchBar/SearchBar.tsx";
import FadeInSection from "../../components/FadeInSection/FadeInSection.tsx";

export default function Resume() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("query") || "");
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);

    useEffect(() => {
        const data = fetchProjects().sort((a, b) => {
            // Prioritize featured projects
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;

            // Compare endDate if both are present
            if (a.endDate && b.endDate) {
                return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
            }

            // If one has endDate and the other doesn't, prioritize the one with endDate
            if (a.endDate && !b.endDate) return -1;
            if (!a.endDate && b.endDate) return 1;

            // Fallback to startDate comparison
            return new Date(a.beginDate).getTime() - new Date(b.beginDate).getTime();
        });
        setProjects(data);
    }, []);

    // Sync the input state with the URL query parameter
    useEffect(() => {
        const currentQuery = searchParams.get("query");
        if (currentQuery !== query) {
            setSearchParams({query});
        }
    }, [query, searchParams, setSearchParams]);

    useEffect(() => {
        const q: string = query.trim().toLowerCase();
        const filtered: ProjectData[] = projects?.filter((project: ProjectData) => {
            return project.tags.some((tag) => tag.toLowerCase().includes(q)) ||
                project.techStack.some((tag) => tag.toLowerCase().includes(q));
        });
        setFilteredProjects(filtered);
    }, [query, projects]);

    return (
        <>
            <FadeInSection>
                <SearchBar query={query} setQuery={setQuery}/>
            </FadeInSection>
            <FadeInSection>
                {filteredProjects && filteredProjects.length > 0 ? (
                    <div className="resume-container">
                        {filteredProjects.map((projectData: ProjectData) => (
                            <div className="resume-item" key={projectData.slug}>
                                <div className="resume-item__details">
                                    <h3 className="resume-item__name">{projectData.name}</h3>
                                    <p className="resume-item__desc">{projectData.description}</p>
                                    <p className="resume-item__tags">{projectData.tags.map((tag) => (
                                        <span className="resume-item__tag" key={tag} onClick={() => setQuery(tag)}>
                                        {tag}
                                    </span>
                                    ))}</p>
                                </div>
                                <div className="resume-item__date-container">
                                    {projectData.endDate ? (
                                        <>
                                            <p className="resume-item__begin-date resume-item__date">{projectData.beginDate}</p>
                                            <p className="resume-item__date-sep resume-item__date">—</p>
                                            <p className="resume-item__end-date resume-item__date">{projectData.endDate}</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="resume-item__begin-date resume-item__date">{projectData.beginDate}</p>
                                            <p className="resume-item__date-sep resume-item__date">—</p>
                                            <p className="resume-item__end-date resume-item__date">ongoing</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))
                        }
                    </div>
                ) : (
                    <p className="resume-container__empty">What have we here?? A skill I don't possess! Nonsense...</p>
                )}
            </FadeInSection>
            <div className="resume-container__footer"></div>
        </>
    );
}