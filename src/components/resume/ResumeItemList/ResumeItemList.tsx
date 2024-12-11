import ResumeItem from "../ResumeItem/ResumeItem.tsx";
import {compareProjects, filterProjects} from "../../../scripts/search_utils.ts";
import {useData} from "../../../contexts/DataContext.tsx";
import {ProjectData} from "../../../scripts/types.ts";
import {useEffect, useState} from "react";

export default function ResumeItemList({searchTerms, searchFilter, handleTagClick}: {
    searchTerms: string[];
    searchFilter: string;
    handleTagClick: (e: MouseEvent, query: string) => void;
}) {
    const {projects} = useData();
    const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);

    useEffect(() => {
        setFilteredProjects(filterProjects(projects, searchTerms, searchFilter).sort((a: ProjectData, b: ProjectData): number => compareProjects(a, b)))
    }, [projects, searchTerms, searchFilter]);

    return (
        <>
            {(
                filteredProjects?.length > 0 &&
                <div className="resume-container">
                    {filteredProjects.map((projectData: ProjectData) => (
                        <ResumeItem key={projectData.slug}
                                    project={projectData}
                                    searchTerms={searchTerms}
                                    handleTagClick={handleTagClick}
                        />
                    ))}
                </div>
            ) || (
                <p className="resume-container__empty">What have we here?? A skill I don't possess! Nonsense...</p>
            )}
        </>
    );
}