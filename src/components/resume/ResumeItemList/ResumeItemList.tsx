import {fetchProjects, ProjectData} from "../../../scripts/fetchers.ts";
import ResumeItem from "../ResumeItem/ResumeItem.tsx";
import {compareProjects, filterProjects} from "../../../scripts/search_utils.ts";

const resource = fetchProjects();

export default function ResumeItemList({searchTerms, searchFilter, handleTagClick}: {
    searchTerms: string[];
    searchFilter: string;
    handleTagClick: (e: MouseEvent, query: string) => void;
}) {

    const projects: ProjectData[] =
        filterProjects(resource.read(), searchTerms, searchFilter)
            .sort((a: ProjectData, b: ProjectData): number => compareProjects(a, b));

    return <>
        {projects?.length > 0 &&
            <div className="resume-container">
                {projects.map((projectData: ProjectData) => (
                    <ResumeItem key={projectData.slug}
                                project={projectData}
                                searchTerms={searchTerms}
                                handleTagClick={handleTagClick}
                    />
                ))}
            </div>
        }
    </>
}